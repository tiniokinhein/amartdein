import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { NEWS } from '../../config/api'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'

const HomeThreeGrids = () => {

    const { data: items } = useSWR(
        NEWS + '?per_page=3&_embed=1', 
        () => axios.get(NEWS + '?per_page=3&_embed=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { t } = useTranslation()

    const lists = items && items.slice(0,3).length ? (
        <>
            <h4 
                className="mb-3 pb-3 text-dark"
                style={{
                    fontSize: '1.2rem',
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                    borderBottom: '4px solid #e9ecef'
                }}
            >
                {/* {t('site.latest.news')} */}
                World
            </h4>

            <div className="row pt-2">
                {
                    items
                    .slice(0,3)
                    .map((p) => (
                        <div 
                            key={p.id}
                            className="col-12 col-md-4 mb-4 mb-md-0"
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
                                                    height: '210px',
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
                                                className="d-flex h-100 align-items-center"
                                                style={{
                                                    fontSize: '0.9rem',
                                                    color: '#fff',
                                                    fontFamily: "'Inter Bold', 'Mon', sans-serif"
                                                }}
                                            >
                                                {t('site.read.more')}
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
                                            className="text-decoration-none text-capitalize text-dark title-link"
                                            style={{
                                                fontFamily: "'Inter ExtraBold','Mon', sans-serif",
                                                fontSize: '1.2rem',
                                                transition: '0.3s linear',
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
                                    className="mb-5 text-dark overflow-hidden"
                                    style={{
                                        fontSize: '0.9rem',
                                        fontFamily: "'Inter Regular', 'Mon', sans-serif",
                                        display: '-webkit-box',
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: 'vertical'
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
                                    <span className="c-date">
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
        </>
    ) : (
        <>
            <div 
                className="mb-3 pb-3"
                style={{
                    borderBottom: '4px solid #e9ecef'
                }}
            >
                <Skeleton width={150} height={23} />
            </div>

            <div className="row pt-2">
                {
                    Array(3).fill().map((items,index) => (
                        <div 
                            key={index}
                            className="col-12 col-md-4 mb-4 mb-md-0"
                        >
                            <div className="h-100 position-relative">
                                <Skeleton height={210} />
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
                                    <Skeleton height={14} width={100} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )

    return (
        <div className="py-5">
            <div className="container">
                {lists}
            </div>
        </div>
    )
}

export default HomeThreeGrids
