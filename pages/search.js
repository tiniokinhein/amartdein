import Link from 'next/link'
import { NextSeo } from 'next-seo'
import React from 'react'
import axios from 'axios'
import { NEWS, USERS } from '../config/api'
import { useTranslation } from 'react-i18next'
import Layout from '../components/layout/Layout'
import Skeleton from 'react-loading-skeleton'
import { BiTime } from 'react-icons/bi'
import Moment from 'react-moment'
import FollowUs from '../components/social/FollowUs'
import LatestNews from '../components/news/LatestNews'
import Topics from '../components/category/Topics'
import MostViewedNews from '../components/news/MostView'
import useSWR from 'swr'

const Search = (props) => {

    const { data: users } = useSWR(
        USERS + '?per_page=100',
        () => axios.get(USERS + '?per_page=100').then(res => res.data),
        { refreshInterval: 1000 }
    )

    const [items, setItems] = React.useState([])
    const [loading , setLoading] = React.useState(false)
    const [visible , setVisible] = React.useState(5)
    const { t } = useTranslation()

    React.useEffect(() => {
        axios 
        .get(NEWS + `?per_page=100&_embed=1`)
        .then(res => {
            const { data } = res 
            const searchFilter = data.filter(fr => 
                fr.title.rendered.toLowerCase().includes(props.result.toLowerCase()) ||
                fr.acf.title_mon.toLowerCase().includes(props.result.toLowerCase()) ||
                fr.acf.content_en.toLowerCase().includes(props.result.toLowerCase()) ||
                fr.acf.content_mon.toLowerCase().includes(props.result.toLowerCase()) ||
                fr._embedded.author[0].acf.full_name_en.toLowerCase().includes(props.result.toLowerCase()) ||
                fr._embedded.author[0].acf.full_name_mon.toLowerCase().includes(props.result.toLowerCase())
            )
            setItems(searchFilter)
        })
        .catch(err => console.log(err.message))

        setTimeout(() => {
            setLoading(true)
        }, 1000)

    }, [props.result])

    const showMore = () => {
        setVisible((prev) => {
            return prev + 5
        })
    }

    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const headList = (
        <div className="py-5">
            <span
                className="text-dark"
                style={{
                    fontSize: '0.9rem',
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif"
                }}
            >
                {t('site.search.results')}
            </span>
            <h1 
                className="mb-2 mt-3 text-dark text-capitalize"
                style={{
                    fontSize: '2rem',
                    fontFamily: "'Inter Black', 'Mon', sans-serif"
                }}
                dangerouslySetInnerHTML={{
                    __html: props.result
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
    )

    const contentList = items.length ? (
        <> 
            {
                items.slice(0,visible).map((p) => (
                    <div 
                        className="p-4 border" 
                        key={p.id}
                        style={{
                            marginTop: '-1px'
                        }}
                    >
                        <div className="row">
                            <div className="col-12 col-sm-6 pe-3 pe-sm-4">
                                <div className="h-100 news-readmore-link">
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
                                                    lineHeight: '1.5em',
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
        Array(1).fill().map((item,index) => (
            <div key={index} className="mb-1">
                <Skeleton height={310} />
            </div>
        ))
    )

    const authorList = (
        <div className="pb-5">
            <h4 
                className="mb-3 pb-3 text-dark text-capitalize"
                style={{
                    fontSize: '1.2rem',
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                    borderBottom: '4px solid #e9ecef'
                }}
            >
                {t('site.other.authors')}
            </h4>

            {
                users && users.filter(fr => fr.id !== 1).slice(0,5).length ? (
                    <div className="">
                        {
                            users
                            .filter(fr => fr.id !== 1)
                            .slice(0,5)
                            .map((p) => (
                                <div 
                                    className="pb-3 mb-3 border-bottom border-light d-flex align-items-center"
                                    key={p.id}
                                >
                                    <Link href="/author/[id]" as={`/author/${p.id}`}>
                                        <a 
                                            className="text-decoration-none"
                                        >
                                            <img 
                                                src={p.acf.image.url}
                                                alt=""
                                                className="rounded-circle"
                                                style={{
                                                    width: '60px',
                                                    height: '60px'
                                                }}
                                            />
                                        </a>
                                    </Link>
                                    <Link href="/author/[id]" as={`/author/${p.id}`}>
                                        <a 
                                            className="text-decoration-none text-dark title-link ms-4"
                                            style={{
                                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                                fontSize: '1rem'
                                            }}
                                        >
                                            {t('a.d', {
                                                d_en: p.acf.full_name_en,
                                                d_mon: p.acf.full_name_mon
                                            })}
                                        </a>
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div className="">
                        {
                            Array(5).fill().map((item,index) => (
                                <div 
                                    className="pb-3 mb-3 border-bottom d-flex align-items-center"
                                    key={index}
                                >
                                    <div>
                                        <Skeleton width={60} height={60} circle={true} />
                                    </div>
                                    <div className="ms-4 flex-grow-1">
                                        <Skeleton height={24} width={'70%'} />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )

    const title = t('site.searched.for') + ' ' + (props.result) + ' - '

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
                                    {authorList}
                                    <MostViewedNews />
                                    <LatestNews />
                                    <Topics />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

Search.getInitialProps = (context) => {
    const { result } = context.query
    return {
        result
    }
}

export default Search
