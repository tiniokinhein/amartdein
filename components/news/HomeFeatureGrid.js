import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { NEWS } from '../../config/api'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'
import { BsArrowRightShort } from 'react-icons/bs'
import moment from 'moment'
import useSWR from 'swr'

const HomeFeatureGrid = () => {

    const { data: items } = useSWR(
        NEWS + '?per_page=5&_embed=1', 
        () => axios.get(NEWS + '?per_page=5&_embed=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { t } = useTranslation()

    const leftList = items && 
        items.filter(fr => moment(fr.date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')).slice(0,1).length ? (
            items
            .filter(fr => 
                moment(fr.date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')
            )
            .slice(0,1)
            .map((p) => (
                <div 
                    key={p.id} 
                    className="h-100 d-flex align-items-end"
                    style={{
                        background: "url("+ p.acf.image.url +") no-repeat center / cover",
                        cursor: 'pointer'
                    }}
                    onClick={() => router.push(`/news/${p.id}`)}
                >
                    <div className="pt-5 mt-5 px-4 pb-4">
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
                            className="my-3 pe-0 pe-lg-5"
                        >
                            <Link href="/news/[id]" as={`/news/${p.id}`}>
                                <a 
                                    className="text-decoration-none text-capitalize px-3 mobile-header-title"
                                    style={{
                                        background: '#0ee6b0',
                                        color: '#000',
                                        fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                        fontSize: '1.6rem',
                                        lineHeight: '2.5em',
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
                            className="m-0 text-uppercase d-flex align-items-center"
                            style={{
                                fontSize: '0.6rem',
                                color: 'rgba(255,255,255,.78)',
                                fontFamily: "'Inter SemiBold', 'Mon', sans-serif"
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
                                    className="text-decoration-none ms-1 me-3 author-link"
                                    style={{
                                        color: '#fff'
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
            ))
        ) : (
            <div 
                className="h-100"
                style={{
                    minHeight: '300px'
                }}
            >
                <Skeleton height={'100%'} />
            </div>
        )

    const rightList = items && 
        items.filter(fr => moment(fr.date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')).slice(1,5).length ? (
            <div>
                {
                    items
                    .filter(fr => 
                        moment(fr.date).format('YYYY-MM-DD') === moment(new Date()).format('YYYY-MM-DD')
                    )
                    .slice(1,5)
                    .map((p) => (
                        <div 
                            key={p.id}
                            className="d-flex pt-3 mt-3 first-border-top-none"
                        >
                            <div className="news-readmore-link">
                                <Link href="/news/[id]" as={`/news/${p.id}`}>
                                    <a 
                                        className="text-decoration-none d-flex"
                                        style={{
                                            width: '80px',
                                            height: '80px',
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
                                    className="mb-2"
                                >
                                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                                        <a 
                                            className="text-decoration-none text-capitalize title-link overflow-hidden"
                                            style={{
                                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                                fontSize: '1rem',
                                                color: '#fff',
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
                                    className="m-0 text-uppercase d-block d-md-flex d-lg-block flex-md-column"
                                    style={{
                                        fontSize: '0.6rem',
                                        color: 'rgba(255,255,255,.5)',
                                        fontFamily: "'Inter Light', 'Mon', sans-serif"
                                    }}
                                >
                                    <Link href="/category/[id]" as={`/category/${p._embedded['wp:term'][0][0].id}`}>
                                        <a
                                            className="text-decoration-none text-uppercase me-3 h-feat-link"
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: p._embedded['wp:term'][0][0].name,
                                                    d_mon: p._embedded['wp:term'][0][0].acf.title_mon
                                                })
                                            }}
                                        />
                                    </Link>
                                    <span className="c-date ps-2">
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
            <div>
                {
                    Array(4).fill().map((items,index) => (
                        <div 
                            key={index}
                            className="d-flex pt-3 mt-3 first-border-top-none"
                        >
                            <div>
                                <Skeleton width={80} height={80} />
                            </div>
                            <div className="ps-3 flex-grow-1">
                                <div 
                                    className="mb-2"
                                >
                                    <Skeleton count={2} />
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                        <Skeleton width={'70%'} />
                                    </div>
                                    <div className="flex-grow-1">
                                        <Skeleton width={'70%'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )

    return (
        <div
            className="py-5"
            style={{
                background: '#000'
            }}
        >
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-8 mb-4 mb-md-0">
                        {leftList}
                    </div>
                    <div className="col-12 col-md-4">
                        <h4 
                            className="mb-4 pb-3"
                            style={{
                                fontSize: '1.2rem',
                                color: '#0ee6b0',
                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                borderBottom: '4px solid #49494b'
                            }}
                        >
                            {/* {t('site.latest.news')} */}
                            Spotlight
                            <span
                                className="float-end d-inline-block"
                                style={{
                                    fontSize: '0.8rem',
                                    color: 'rgba(255,255,255,.5)',
                                    fontFamily: "'Inter Medium', sans-serif",
                                    marginTop: '5px'
                                }}
                            >
                                <Moment format="DD MMMM , YYYY">
                                    {Date.now()}
                                </Moment>
                            </span>
                        </h4>
                        
                        {rightList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeFeatureGrid
