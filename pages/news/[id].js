import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { NEWS } from '../../config/api'
import Parse from 'html-react-parser'
import Skeleton from 'react-loading-skeleton'
import { RiArrowDropRightLine } from 'react-icons/ri'
import { BiTime } from 'react-icons/bi'
import Moment from 'react-moment'
import FollowUs from '../../components/social/FollowUs'
import Topics from '../../components/category/Topics'
import { BsArrowRightShort } from 'react-icons/bs'
import {
    FacebookShareButton,
    // FacebookShareCount,
    TwitterShareButton,
    LinkedinShareButton,
    InstapaperShareButton
} from 'react-share'
import { IoLogoInstagram } from 'react-icons/io5'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { ImTwitter , ImLinkedin2 } from 'react-icons/im'
import MostViewedNews from '../../components/news/MostView'
import useSWR from 'swr'

const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYW1hcnQuamFuYW1vbi5jbyIsImlhdCI6MTYxNjQwOTQ3OCwibmJmIjoxNjE2NDA5NDc4LCJleHAiOjE2MTcwMTQyNzgsImRhdGEiOnsidXNlciI6eyJpZCI6MX19fQ.5jKniCS6VZn2gFTSw_ikdN9HUDEOoPm7KpFfPDzU7pI'

const NewsDetail = ({ item }) => {

    const { data: items } = useSWR(
        NEWS + `?per_page=100&_embed=1`,
        () => axios.get(NEWS + `?per_page=100&_embed=1`).then(res => res.data),
        { refreshInterval: 1000 }
    )

    const [p , setP] = React.useState(null)
    const [loading , setLoading] = React.useState(false)
    const { t } = useTranslation()
    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    React.useEffect(() => {
        axios
        .get(NEWS + `/${item.id}?_embed=1`)
        .then(res => {
            setP(res.data)
        })
        .catch(err => console.log(err.message))

        axios({
            method: 'PUT',
            url: NEWS + `/${p ? p.id : null}`,
            headers:{
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: JSON.stringify({
                meta: {
                    views: (p ? p.meta.views : null) + 1
                }
            })
        })
        .then(() => {})
        .catch(() => {})

        setTimeout(() => {
            setLoading(true)
        }, 1000)

    }, [item.id , (p ? p.id : null) , (p ? p.meta.views : null)])

    const banner = p ? (
        <div className="bg-theme" key={p.id}>
            <div 
                style={{
                    height: '520px',
                    background: "url("+ p.acf.image.url +") no-repeat center / cover fixed"
                }}
            >
                <div className="container">
                    <div className="pt-4">
                        <Link href="/">
                            <a 
                                className="text-decoration-none me-1 bn-link"
                                style={{
                                    fontSize: '0.75rem',
                                    color: 'rgba(255,255,255,.5)',
                                    fontFamily: "'Inter Medium', 'Mon', sans-serif"
                                }}
                            >
                                {t('site.home')}
                            </a>
                        </Link>
                        <RiArrowDropRightLine size="1.5rem" color="rgba(255,255,255,.5)" />
                        <Link href="/category/[id]" as={`/category/${p._embedded['wp:term'][0][0].id}`}>
                            <a 
                                className="text-decoration-none mx-1 bn-link"
                                style={{
                                    fontSize: '0.75rem',
                                    color: 'rgba(255,255,255,.5)',
                                    fontFamily: "'Inter Medium', 'Mon', sans-serif"
                                }}
                            >
                                {t('a.d', {
                                    d_en: p._embedded['wp:term'][0][0].name,
                                    d_mon: p._embedded['wp:term'][0][0].acf.title_mon
                                })}
                            </a>
                        </Link>
                        <RiArrowDropRightLine size="1.5rem" color="rgba(255,255,255,.5)" />
                        <span
                            className="ms-1"
                            style={{
                                fontSize: '0.75rem',
                                color: '#fff',
                                fontFamily: "'Inter Medium', 'Mon', sans-serif"
                            }}
                        >
                            {t('a.d', {
                                d_en: p.title.rendered,
                                d_mon: p.acf.title_mon
                            })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="news-slug">
            <Skeleton height={500} />
        </div>
    )

    const desktopShareSocials = (
        <div className="my-5 px-4 d-none d-sm-flex align-items-center justify-content-center bg-light">
            <FacebookShareButton 
                className="mx-2 my-3 px-3 py-2" 
                style={{
                    backgroundColor: '#3b5998'
                }}
                url={w}
                quote={t('a.d' , {
                    d_en: p ? p.title.rendered : null,
                    d_mon: p ? p.acf.title_mon : null
                })}
            >
                <RiFacebookCircleFill 
                    size="1.4rem" 
                    color="#fff" 
                />
            </FacebookShareButton>
            <TwitterShareButton 
                className="mx-2 my-3 px-3 py-2"
                style={{
                    backgroundColor: '#00aced'
                }}
                url={w}
                title={t('a.d' , {
                    d_en: p ? p.title.rendered : null,
                    d_mon: p ? p.acf.title_mon : null
                })}
            >
                <ImTwitter 
                    size="1.4rem" 
                    color="#fff" 
                />
            </TwitterShareButton>
            <LinkedinShareButton 
                className="mx-2 my-3 px-3 py-2"
                style={{
                    backgroundColor: '#007fb1'
                }}
                url={w}
            >
                <ImLinkedin2 
                    size="1.4rem" 
                    color="#fff" 
                />
            </LinkedinShareButton>
            <InstapaperShareButton
                className="mx-2 my-3 px-3 py-2"
                style={{
                    backgroundColor: '#e84e5e'
                }}
                url={w}
                title={t('a.d' , {
                    d_en: p ? p.title.rendered : null,
                    d_mon: p ? p.acf.title_mon : null
                })}
            >
                <IoLogoInstagram
                    size="1.4rem" 
                    color="#fff"
                />
            </InstapaperShareButton>
        </div>
    )

    const mobileShareSocials = (
        <div 
            className="d-flex d-sm-none align-items-center justify-content-between bg-light position-fixed"
            style={{
                left: 0,
                right: 0,
                bottom: 0
            }}
        >
            <FacebookShareButton 
                className="py-2 flex-grow-1" 
                style={{
                    backgroundColor: '#3b5998'
                }}
                url={w}
                quote={t('a.d' , {
                    d_en: p ? p.title.rendered : null,
                    d_mon: p ? p.acf.title_mon : null
                })}
            >
                <RiFacebookCircleFill 
                    size="1rem" 
                    color="#fff" 
                />
            </FacebookShareButton>
            <TwitterShareButton 
                className="py-2 flex-grow-1"
                style={{
                    backgroundColor: '#00aced'
                }}
                url={w}
                title={t('a.d' , {
                    d_en: p ? p.title.rendered : null,
                    d_mon: p ? p.acf.title_mon : null
                })}
            >
                <ImTwitter 
                    size="1rem" 
                    color="#fff" 
                />
            </TwitterShareButton>
            <LinkedinShareButton 
                className="py-2 flex-grow-1"
                style={{
                    backgroundColor: '#007fb1'
                }}
                url={w}
            >
                <ImLinkedin2 
                    size="1rem" 
                    color="#fff" 
                />
            </LinkedinShareButton>
            <InstapaperShareButton
                className="py-2 flex-grow-1"
                style={{
                    backgroundColor: '#e84e5e'
                }}
                url={w}
                title={t('a.d' , {
                    d_en: p ? p.title.rendered : null,
                    d_mon: p ? p.acf.title_mon : null
                })}
            >
                <IoLogoInstagram
                    size="1rem" 
                    color="#fff"
                />
            </InstapaperShareButton>
        </div>
    )

    const list = p ? (
        <div className="col-12 col-lg-8" key={p.id}>
            <div
                key={p.id}
                className="position-relative"
                style={{
                    marginTop: '-5rem'
                }}
            >
                <ul 
                    className="list-unstyled m-0 p-0"
                >
                    {
                        p._embedded['wp:term'][0].map((m) => (
                            <li key={m.id} className="d-inline-block">
                                <Link href="/category/[id]" as={`/category/${m.id}`}>
                                    <a
                                        className="text-decoration-none text-uppercase me-3 p-2 bg-cat-black"
                                        style={{
                                            color: '#fff',
                                            fontSize: '0.7rem'
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: m.name,
                                                d_mon: m.acf.title_mon
                                            })
                                        }}
                                    />
                                </Link>
                            </li>
                        ))
                    }
                </ul>
                <h1
                    className="my-3"
                >
                    <span
                        className="text-capitalize px-3 mobile-content-title-size"
                        style={{
                            lineHeight: '2.2em',
                            background: '#0ee6b0',
                            color: '#000',
                            fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                            fontSize: '2.2rem',
                            boxDecorationBreak: 'clone',
                            WebkitBoxDecorationBreak: 'clone',
                            wordWrap: 'break-word',
                            paddingTop: '15px',
                            paddingBottom: '15px'
                        }}
                        dangerouslySetInnerHTML={{
                            __html: t('a.d' , {
                                d_en: p.title.rendered,
                                d_mon: p.acf.title_mon
                            })
                        }}
                    />
                </h1>
                <p
                    className="m-0 text-uppercase text-secondary"
                    style={{
                        fontSize: '0.7rem'
                    }}
                >
                    <Link href="/author/[id]" as={`/author/${p._embedded.author[0].id}`}>
                        <a className="text-decoration-none pe-2">
                            <img 
                                src={p._embedded.author[0].acf.image.url}
                                alt=""
                                className="rounded-circle"
                                width="35"
                            />
                        </a>
                    </Link>
                    {t('site.by')} 
                    <Link href="/author/[id]" as={`/author/${p._embedded.author[0].id}`}>
                        <a 
                            className="text-decoration-none ms-1 me-2 text-dark author-link"
                            style={{
                                fontFamily: "'Inter Bold', 'Mon', sans-serif"
                            }}
                        >
                            {t('a.d', {
                                d_en: p._embedded.author[0].acf.full_name_en,
                                d_mon: p._embedded.author[0].acf.full_name_mon
                            })}
                        </a>
                    </Link>
                    <span className="c-date ps-2 me-2 text-secondary">
                        <Moment format="DD MMMM , YYYY">
                            {p.date}
                        </Moment>
                    </span>
                    <span className="c-date ps-2 text-secondary">
                        <BiTime />
                        <span className="ms-1 text-dark">
                            {t('a.d', {
                                d_en: p.acf.read_en,
                                d_mon: p.acf.read_mon
                            })}
                        </span>
                    </span>                                
                </p>
            </div>
            <div className="py-5 px-0 px-lg-5">
                <p 
                    className="mb-0 text-dark inside-par-div"
                    style={{
                        lineHeight: (typeof window !== 'undefined' ? window.localStorage.getItem('language') : 'undefined') === 'en' ? '1.7em' : '2em'
                    }}
                    dangerouslySetInnerHTML={{
                        __html: t('a.d', {
                            d_en: p.acf.content_en,
                            d_mon: p.acf.content_mon
                        })
                    }}
                />
            </div>
            <ul 
                className="list-unstyled mb-5 p-0"
            >
                {
                    p._embedded['wp:term'][0].map((m) => (
                        <li key={m.id} className="d-inline-block">
                            <Link href="/category/[id]" as={`/category/${m.id}`}>
                                <a
                                    className="text-decoration-none text-lowercase me-3 p-2 bg-cat-link"
                                    style={{
                                        fontSize: '0.7rem'
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: t('a.d', {
                                            d_en: m.name,
                                            d_mon: m.acf.title_mon
                                        })
                                    }}
                                />
                            </Link>
                        </li>
                    ))
                }
            </ul>

            {desktopShareSocials}
        </div>
    ) : (
        <div className="col-12 col-lg-8">
            <div
                className="position-relative"
                style={{
                    marginTop: '-5rem'
                }}
            >
                <div>
                    <Skeleton width={60} />
                </div>
                <div
                    className="my-3"
                >
                    <Skeleton height={70} count={2} />
                </div>
                <div className="d-flex">
                    <Skeleton width={20} />
                    <span className="ms-1 me-3">
                        <Skeleton width={50} />
                    </span>
                    <span className="c-date ps-2">
                        <Skeleton width={60} />
                    </span>
                </div>
            </div>
            <div className="py-5 px-0 px-lg-5">
                <div>
                    <Skeleton count={15} />
                </div>
            </div>
            <div>
                <Skeleton width={60} />
            </div>
        </div>
    )

    const latestNews = items && items.filter(fr => (p ? p.id : null) !== fr.id).slice(0,5).length ? (
        <div className="pt-1">
            {
                items
                .filter(fr => (p ? p.id : null) !== fr.id)
                .slice(0,5)
                .map((p) => (
                    <div 
                        className="pb-3 mb-3 border-bottom border-light d-flex"
                        key={p.id}
                    >
                        <div className="news-readmore-link">
                            <Link href="/news/[id]" as={`/news/${p.id}`}>
                                <a 
                                    className="text-decoration-none d-flex"
                                    style={{
                                        width: '100px',
                                        height: '100px',
                                        background: "url("+ p.acf.image.url +") no-repeat center / cover"
                                    }}
                                >
                                    <span 
                                        className="w-100 d-flex flex-column justify-content-center align-items-center"
                                    >
                                        <BsArrowRightShort size="1.5rem" color="#fff" />
                                    </span>
                                </a>
                            </Link>
                        </div>
                        <div className="ps-3">
                            <h4 
                                className="mb-2 overflow-hidden"
                            >
                                <Link href="/news/[id]" as={`/news/${p.id}`}>
                                    <a 
                                        className="text-decoration-none text-capitalize text-dark title-link overflow-hidden"
                                        style={{
                                            fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                            fontSize: '1rem',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            lineHeight: (typeof window !== 'undefined' ? window.localStorage.getItem('language') : 'undefined') === 'en' ? '1.5em' : '2em'
                                        }}
                                        dangerouslySetInnerHTML={{
                                            __html: t('a.d', {
                                                d_en: p.title.rendered,
                                                d_mon: p.acf.title_mon
                                            })
                                        }}
                                    />
                                </Link>
                            </h4>
                            <p
                                className="m-0 text-uppercase text-black-50"
                                style={{
                                    fontSize: '0.6rem',
                                    fontFamily: "'Inter SemiBold', sans-serif"
                                }}
                            >
                                <Moment format="DD MMMM , YYYY">
                                    {p.date}
                                </Moment>
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
    ) : (
        <div className="pt-1">
            {
                Array(5).fill().map((item,index) => (
                    <div 
                        className="pb-3 mb-3 border-bottom border-light d-flex"
                        key={index}
                    >
                        <div>
                            <Skeleton width={100} height={100} />
                        </div>
                        <div className="ps-3 flex-grow-1">
                            <div 
                                className="mb-3"
                            >
                                <Skeleton count={2} />
                            </div>
                            <div>
                                <Skeleton width={'50%'} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )

    const relatedNews = 
        items &&
        items
        .filter(fr => 
            (p ? p._embedded['wp:term'][0][0].name : null) === fr._embedded['wp:term'][0][0].name &&
            (p ? p.id : null) !== fr.id
        )
        .length ? (
            <div className="row pt-3 mx-lg-n4">
                {
                    items 
                    .filter(fr => 
                        (p ? p._embedded['wp:term'][0][0].name : null) === fr._embedded['wp:term'][0][0].name &&
                        (p ? p.id : null) !== fr.id
                    )
                    .slice(0,4)
                    .map((p) => (
                        <div 
                            key={p.id}
                            className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0 px-lg-4 related-border-end"
                        >
                            <div className="h-100 position-relative">
                                <div className="position-relative news-readmore-link">
                                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                                        <a className="text-decoration-none">
                                            <img 
                                                src={p.acf.image.url}
                                                alt=""
                                                className="w-100"
                                                style={{
                                                    height: '250px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </a>
                                    </Link>
                                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                                        <a 
                                            className="position-absolute text-decoration-none d-flex flex-column justify-content-between align-items-center"
                                            style={{
                                                left: 0,
                                                top: 0,
                                                right: 0,
                                                bottom: 0,
                                                background: 'rgba(0,0,0,0.42)'
                                            }}
                                        >
                                            <span 
                                                style={{
                                                    marginTop: '30%',
                                                    fontSize: '0.9rem',
                                                    color: '#fff',
                                                    fontFamily: "'Inter Bold', 'Mon', sans-serif"
                                                }}
                                            >
                                                {t('site.read.more')}
                                            </span>
                                            <span 
                                                className="text-uppercase"
                                                style={{
                                                    fontSize: '0.7rem',
                                                    color: '#efefef'
                                                }}
                                            >
                                                <BiTime />
                                                <span 
                                                    className="ms-1 mb-3 d-inline-block"
                                                    style={{
                                                        color: '#fff'
                                                    }}
                                                >
                                                    {t('a.d', {
                                                        d_en: p.acf.read_en,
                                                        d_mon: p.acf.read_mon
                                                    })}
                                                </span>
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                                
                                <ul 
                                    className="list-unstyled mt-2 mb-0 mx-0 p-0"
                                >
                                    {
                                        p._embedded['wp:term'][0].map((m) => (
                                            <li key={m.id} className="d-inline-block">
                                                <Link href="/category/[id]" as={`/category/${m.id}`}>
                                                    <a
                                                        className="text-decoration-none text-uppercase me-3 colored-link"
                                                        style={{
                                                            color: '#03ae84',
                                                            fontSize: '0.7rem',
                                                            fontFamily: "'Inter SemiBold', 'Mon', sans-serif"
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                            __html: t('a.d', {
                                                                d_en: m.name,
                                                                d_mon: m.acf.title_mon
                                                            })
                                                        }}
                                                    />
                                                </Link>
                                            </li>
                                        ))
                                    }
                                </ul>
                                <h4 
                                    className="mt-2 mb-3"
                                >
                                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                                        <a 
                                            className="text-decoration-none text-dark title-link"
                                            style={{
                                                fontFamily: "'Inter ExtraBold','Mon', sans-serif",
                                                fontSize: '1.2rem',
                                                lineHeight: (typeof window !== 'undefined' ? window.localStorage.getItem('language') : 'undefined') === 'en' ? '1.5em' : '2em',
                                                transition: '0.3s linear'
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: p.title.rendered,
                                                    d_mon: p.acf.title_mon
                                                })
                                            }}
                                        />
                                    </Link>
                                </h4>
                                <p 
                                    className="mb-5 text-dark"
                                    style={{
                                        fontSize: '0.9rem',
                                        fontFamily: "'Inter Regular', 'Mon', sans-serif"
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: t('a.d', {
                                            d_en: p.acf.info_en,
                                            d_mon: p.acf.info_mon
                                        })
                                    }}
                                />

                                <p
                                    className="m-0 text-uppercase text-black-50 position-absolute"
                                    style={{
                                        fontSize: '0.7rem',
                                        left: 0,
                                        right: 0,
                                        bottom: 0
                                    }}
                                >
                                    {t('site.by')} 
                                    <Link href="/author/[id]" as={`/author/${p._embedded.author[0].id}`}>
                                        <a 
                                            className="text-decoration-none ms-1 me-3 text-dark author-link"
                                            style={{
                                                fontFamily: "'Inter SemiBold', 'Mon', sans-serif"
                                            }}
                                        >
                                            {t('a.d', {
                                                d_en: p._embedded.author[0].acf.full_name_en,
                                                d_mon: p._embedded.author[0].acf.full_name_mon
                                            })}
                                        </a>
                                    </Link>
                                    <span className="c-date ps-2 float-end">
                                        <Moment format="DD MMMM , YYYY">
                                            {p.date}
                                        </Moment>
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        ) : (
            <div className="row pt-3 mx-lg-n4">
                {
                    Array(4).fill().map((items,index) => (
                        <div 
                            key={index}
                            className="col-12 col-sm-6 col-lg-3 mb-4 mb-lg-0 px-lg-4 related-border-end"
                        >
                            <div className="h-100 position-relative">
                                <Skeleton height={250} />
                                <div className="mt-2">
                                    <Skeleton width={100} height={14} />
                                </div>
                                <div className="mt-2 mb-3">
                                    <Skeleton count={2} height={25} />
                                </div>
                                <div className="mb-5">
                                    <Skeleton count={3} height={24} />
                                </div>

                                <div
                                    className="position-absolute"
                                    style={{
                                        left: 0,
                                        right: 0,
                                        bottom: 0
                                    }}
                                >
                                    <span>
                                        <Skeleton height={14} width={100} />
                                    </span>
                                    <span className="float-end">
                                        <Skeleton height={14} width={100} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )

    const combine = t('a.d', {
        d_en: p ? p.title.rendered : null,
        d_mon: p ? p.acf.title_mon : null
    })
    const title = p ? (Parse(combine) + ' - ') : ''

    return (
        <>
            <NextSeo 
                title={title + (loading ? t('site.journal') : 'Amartdein Journal')}
                description={p ? p.acf.info_en : null}
                canonical={w}
                openGraph={{
                    url: w,
                    title: title + t('site.journal'),
                    description: p ? p.acf.info_en : null,
                    images: [
                        {
                        url: p ? p.acf.image.url : null,
                        width: 900,
                        height: 800,
                        alt: p ? p.title.rendered : null,
                        }
                    ],
                }}
            /> 

            <Layout>
                {banner}

                <div className="bg-theme">
                    <div className="container">
                        <div className="row">
                            {list}

                            <div className="col-12 col-lg-4">
                                <div 
                                    className="d-none d-lg-block"
                                    style={{
                                        height: '9rem'
                                    }}
                                />
                                <div 
                                    className="d-block d-lg-none py-5"
                                />
                                <FollowUs />

                                <div className="pb-5">
                                    <h4 
                                        className="mb-3 pb-3 text-dark"
                                        style={{
                                            fontSize: '1.2rem',
                                            fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                            borderBottom: '4px solid #e9ecef'
                                        }}
                                    >
                                        {t('site.latest.news')}
                                    </h4>

                                    {latestNews}
                                </div>
                                
                                <MostViewedNews />
                                <Topics />
                            </div>

                            <div className="col-12">
                                <div className="py-5">
                                    {
                                        items &&
                                        items
                                        .filter(fr => 
                                            (p ? p._embedded['wp:term'][0][0].name : null) === fr._embedded['wp:term'][0][0].name &&
                                            (p ? p.id : null) !== fr.id
                                        )
                                        .length >= 1 ? (
                                            <>
                                                <h4 
                                                    className="mb-3 pb-3 text-dark"
                                                    style={{
                                                        fontSize: '1.2rem',
                                                        fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                                        borderBottom: '4px solid #e9ecef'
                                                    }}
                                                >
                                                    {t('site.latest.news')}
                                                </h4>

                                                {relatedNews}
                                            </>
                                        ) : null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {mobileShareSocials}
            </Layout>
        </>
    )
}

NewsDetail.getInitialProps = (context) => {
    const { id } = context.query
    return {
        item: {
            id
        }
    }
}

export default NewsDetail
