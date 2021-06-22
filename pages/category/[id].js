import { NextSeo } from 'next-seo'
import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Layout from '../../components/layout/Layout'
import axios from 'axios'
import { CATEGORIES, NEWS } from '../../config/api'
import Parse from 'html-react-parser'
import Skeleton from 'react-loading-skeleton'
import { BiTime } from 'react-icons/bi'
import { BsArrowRightShort } from 'react-icons/bs'
import Moment from 'react-moment'
import FollowUs from '../../components/social/FollowUs'
import LatestNews from '../../components/news/LatestNews'
import MostViewNews from '../../components/news/MostView'
import useSWR from 'swr'


const Categories = ({ itemId }) => {
    
    const [p , setP] = React.useState(null)
    const [items , setItems] = React.useState([])
    const [loading , setLoading] = React.useState(false)
    const [visible , setVisible] = React.useState(10)
    const { t } = useTranslation()

    const { data: topics } = useSWR(
        CATEGORIES + '?per_page=30',
        () => axios.get(CATEGORIES + '?per_page=30').then(res => res.data),
        { refreshInterval: 1000 }
    )

    React.useEffect(() => {
        axios
        .get(NEWS + `?categories=${itemId.id}&per_page=100&_embed=1`)
        .then(res => {
            setItems(res.data)
        })
        .catch(err => console.log(err.message))

        axios 
        .get(CATEGORIES + `/${itemId.id}?_embed=1`)
        .then(res => {
            setP(res.data)
        })
        .catch(err => console.log(err.message))

        setTimeout(() => {
            setLoading(true)
        }, 1000)

    }, [itemId.id])

    const showMore = () => {
        setVisible((prev) => {
            return prev + 5
        })
    }

    const combine = t('a.d', {
        d_en: p ? p.name : null,
        d_mon: p ? p.acf.title_mon : null
    })
    const title = p ? (Parse(combine) + ' - ') : ''

    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const headList = p ? (
        <div key={p.id} className="py-5">
            <span
                className="text-dark"
                style={{
                    fontSize: '0.9rem',
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif"
                }}
            >
                {t('site.browsing.category')}
            </span>
            <h1 
                className="mb-2 mt-3 text-dark"
                style={{
                    fontSize: '2rem',
                    fontFamily: "'Inter Black', 'Mon', sans-serif"
                }}
                dangerouslySetInnerHTML={{
                    __html: t('a.d', {
                        d_en: p.name,
                        d_mon: p.acf.title_mon
                    })
                }}
            />
            <span
                className="text-black-50"
                style={{
                    fontSize: '0.8rem'
                }}
            >
                {items.length} {t('site.length.posts')}
            </span>
        </div>
    ) : (
        <div className="py-5">
            <Skeleton width={100} height={17} />
            <div 
                className="mb-2 mt-3"
            >
                <Skeleton height={38} width={200} />
            </div>
            <Skeleton width={50} height={15} />
        </div>
    )

    const contentList = items.length ? (
        <>
            {
                items.slice(0,visible).map((p) => (
                    <div 
                        className="p-4 border border-light" 
                        key={p.id}
                        style={{
                            marginTop: '-1px'
                        }}
                    >
                        <div className="row">
                            <div className="col-12 col-sm-6 pe-3 pe-sm-4">
                                <div 
                                    className="h-100 news-readmore-link"
                                >
                                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                                        <a 
                                            className="text-decoration-none w-100 d-flex"
                                            style={{
                                                height: '260px',
                                                background: "url("+ p.acf.image.url +") no-repeat center / cover"
                                            }}
                                        >
                                            <span 
                                                className="w-100 d-flex flex-column justify-content-between align-items-center"
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
                                            </span>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 mt-2 mt-sm-0 d-flex flex-column justify-content-between">
                                <div>
                                    <ul 
                                        className="list-unstyled m-0 p-0"
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
                                                    fontSize: '1.3rem',
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
                                        className="mb-3 text-dark"
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
                                </div>
                                <p
                                    className="m-0 text-uppercase text-black-50"
                                    style={{
                                        fontSize: '0.7rem'
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
                                    <span className="c-date ps-2">
                                        <Moment format="DD MMMM , YYYY">
                                            {p.date}
                                        </Moment>
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                visible < items.length && (
                    <div className="mt-4">
                        <button 
                            onClick={showMore}
                            className="btn border-0 rounded-0 shadow-none btn-load-more text-capitalize text-truncate"
                            style={{
                                fontSize: '0.9rem',
                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                padding: '0.8rem 5rem'
                            }}
                        >
                            {t('site.load.more')}
                        </button>
                    </div>
                )
            }
        </>
    ) : (
        Array(4).fill().map((item,index) => (
            <div key={index} className="mb-1">
                <Skeleton height={310} />
            </div>
        ))
    )

    const topicsList = topics && topics.filter(fr => fr.count >= 1 && (p ? p.id : null) !== fr.id).length ? (
        <div className="pt-1">
            {
                topics
                .filter(fr => 
                    fr.count >= 1 &&
                    (p ? p.id : null) !== fr.id
                )
                .map((p) => (
                    <div 
                        key={p.id}
                        className="mb-2 position-relative link-arr-wrapper"
                        style={{
                            zIndex: 0
                        }}
                    >
                        <Link href="/category/[id]" as={`/category/${p.id}`}>
                            <a 
                                className="text-decoration-none"
                            >
                                <img 
                                    src={p.acf.image.url}
                                    alt=""
                                    className="w-100"
                                    style={{
                                        height: '100px',
                                        objectFit: 'cover'
                                    }}
                                />
                            </a>
                        </Link>
                        <Link href="/category/[id]" as={`/category/${p.id}`}>
                            <a 
                                className="text-decoration-none position-absolute d-flex align-items-center justify-content-between"
                                style={{
                                    left: 0,
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'rgba(0,0,0,0.10)'
                                }}
                            >
                                <h4 
                                    className="m-0 px-4"
                                    style={{
                                        color: '#fff',
                                        fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                        fontSize: '1rem'
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: t('a.d', {
                                            d_en: p.name,
                                            d_mon: p.acf.title_mon
                                        })
                                    }}
                                />
                                <span 
                                    className="d-flex flex-column mx-4 rounded-circle text-center overflow-hidden link-arr"
                                    style={{
                                        width: '38px',
                                        height: '38px',
                                        lineHeight: '38px',
                                        fontSize: '0.8rem',
                                        background: '#000',
                                        color: '#fff',
                                        fontFamily: "'Inter SemiBold', sans-serif"
                                    }}
                                >
                                    <span
                                        className="d-block position-relative"
                                        style={{
                                            width: '38px',
                                            height: '38px'
                                        }}
                                    >
                                        {p.count}
                                    </span>
                                    <span
                                        className="d-block position-relative"
                                        style={{
                                            width: '38px',
                                            height: '38px'
                                        }}
                                    >
                                        <BsArrowRightShort size="1.2rem" />
                                    </span>
                                </span>
                            </a>
                        </Link>
                    </div>
                ))
            }
        </div>
    ) : (
        <div className="pt-1">
            {
                Array(4).fill().map((item,index) => (
                    <div 
                        key={index}
                        className="mb-2"
                    >
                        <Skeleton height={100} />
                    </div>
                ))
            }
        </div>
    )

    return (
        <>
            <NextSeo 
                title={title + (loading ? t('site.journal') : 'Amartdein Journal')}
                description=""
                canonical={w}
                openGraph={{
                    url: w,
                    title: title + t('site.journal'),
                    description: '',
                    images: [
                        {
                        url: p ? p.acf.image.url : null,
                        width: 900,
                        height: 800,
                        alt: p ? p.name : null,
                        }
                    ],
                }}
            /> 

            <Layout>
                <div className="bg-theme">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-8 pe-3 pe-lg-5">
                                {headList}
                                {contentList}
                            </div>
                            <div className="col-12 col-lg-4">
                                <div 
                                    className="py-5"
                                >
                                    <FollowUs />
                                    <MostViewNews />
                                    <LatestNews />
                                    
                                    <div>
                                        <h4 
                                            className="mb-3 pb-3 text-dark"
                                            style={{
                                                fontSize: '1.2rem',
                                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                                borderBottom: '4px solid #e9ecef'
                                            }}
                                        >
                                            {t('site.topics')}
                                        </h4>

                                        {topicsList}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

Categories.getInitialProps = (context) => {
    const { id } = context.query

    return {
        itemId: {
            id
        }
    }
}

export default Categories
