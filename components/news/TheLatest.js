import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { NEWS } from '../../config/api'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'
import MostViewedNews from './MostView'
import useSWR from 'swr'

const TheLatest = () => {

    const { data: items } = useSWR(
        NEWS + '?per_page=100&_embed=1', 
        () => axios.get(NEWS + '?per_page=100&_embed=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )
    const [visible , setVisible] = React.useState(10)
    const { t } = useTranslation()

    const showMore = () => {
        setVisible((prev) => {
            return prev + 5
        })
    }

    const fullList = items && items.slice(0,1).length ? (
        items.slice(0,1).map((p) => (
            <div key={p.id} className="position-relative">
                <Link href="/news/[id]" as={`/news/${p.id}`}>
                    <a className="text-decoration-none">
                        <img 
                            src={p.acf.image.url}
                            alt=""
                            className="w-100"
                            style={{
                                height: '500px',
                                objectFit: 'cover'
                            }}
                        />
                    </a>
                </Link>
                <div className="container">
                    <div 
                        className="position-relative text-center"
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
                            className="mt-3 mb-2 col-12 col-lg-8 mx-auto"
                        >
                            <Link href="/news/[id]" as={`/news/${p.id}`}>
                                <a 
                                    className="text-decoration-none text-capitalize px-3 mobile-header-title"
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
                            </Link>
                        </h1>
                        <p
                            className="m-0 text-uppercase text-black-50"
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
                                    className="text-decoration-none ms-1 me-3 author-link text-dark"
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
    ) : (
        <div className="position-relative">
            <Skeleton height={500} />
            <div className="container">
                <div 
                    style={{
                        marginTop: '-5rem'
                    }}
                >
                    <div 
                        className="text-center"
                    >
                        <Skeleton width={60} />
                    </div>
                    <div
                        className="mt-3 mb-2 col-12 col-lg-8 mx-auto"
                    >
                        <Skeleton height={73} count={2} />
                    </div>
                    <div
                        className="d-flex align-items-center justify-content-center"
                    >
                        <Skeleton width={35} height={35} circle={true} />
                        <span className="ms-2">
                            <Skeleton width={20} />
                        </span>
                        <span className="ms-1 me-3">
                            <Skeleton width={50} />
                        </span>
                        <span className="c-date ps-2">
                            <Skeleton width={60} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

    const latestLists = items && items.slice(1,visible).length ? (
        <> 
            {
                items.slice(1,visible).map((p) => (
                    <div 
                        className="pb-4 mb-4 border-bottom border-light" 
                        key={p.id}
                    >
                        <div className="row">
                            <div className="col-12 col-sm-4 pe-3 pe-sm-4">
                                <Link href="/news/[id]" as={`/news/${p.id}`}>
                                    <a 
                                        className="text-decoration-none d-block w-100 img-mobile-height-260"
                                        style={{
                                            height: '100%',
                                            background: "url("+ p.acf.image.url +") no-repeat center / cover"
                                        }}
                                    />
                                </Link>
                            </div>
                            <div className="col-12 col-sm-8 mt-2 mt-sm-0 d-flex flex-column justify-content-between">
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
                                        className="mt-2 mb-3 overflow-hidden"
                                    >
                                        <Link href="/news/[id]" as={`/news/${p.id}`}>
                                            <a 
                                                className="text-decoration-none text-capitalize text-dark title-link overflow-hidden"
                                                style={{
                                                    fontFamily: "'Inter ExtraBold','Mon', sans-serif",
                                                    fontSize: '1.3rem',
                                                    transition: '0.3s linear',
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
                    <div className="mt-4 text-center">
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
        Array(10).fill().map((item,index) => (
            <div 
                className="pb-4 mb-4 border-bottom border-light" 
                key={index}
            >
                <Skeleton height={136} />
            </div>
        ))
    )

    return (
        <>
            {fullList}

            <div className="py-5 mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-lg-8 mb-5 mb-lg-0 pe-3 pe-lg-5">
                            <h4 
                                className="mb-4 pb-3 text-dark"
                                style={{
                                    fontSize: '1.2rem',
                                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                    borderBottom: '4px solid #e9ecef'
                                }}
                            >
                                {t('site.the.latest')}
                            </h4>
                            {latestLists}
                        </div>
                        <div className="col-12 col-lg-4">
                            <MostViewedNews />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TheLatest
