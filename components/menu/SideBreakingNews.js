import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { NEWS } from '../../config/api'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import useSWR from 'swr'

const SideBreakingNews = () => {

    const { data: items } = useSWR(
        NEWS + '?categories=1&per_page=100&_embed=1',
        () => axios.get(NEWS + '?categories=1&per_page=100&_embed=1').then(res => res.data),
        { refreshInterval: 1000 }
    )
    const { t } = useTranslation()

    const list = items && items.slice(0,3).length ? (
        items
        .slice(0,3)
        .map((p) => (
            <div 
                className="pb-3 mb-3 border-bottom"
                key={p.id}
            >
                <Link href="/news/[id]" as={`/news/${p.id}`}>
                    <a 
                        className="text-decoration-none"
                    >
                        <img 
                            src={p.acf.image.url}
                            alt=""
                            className="w-100"
                            style={{
                                height: '200px',
                                objectFit: 'cover'
                            }}
                        />
                    </a>
                </Link>
                <div 
                    className="px-3"
                    style={{
                        marginTop: '-1.8rem'
                    }}
                >
                    <h4 
                        className="mb-3"
                    >
                        <Link href="/news/[id]" as={`/news/${p.id}`}>
                            <a 
                                className="text-decoration-none text-capitalize px-2"
                                style={{
                                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                    fontSize: '1.2rem',
                                    lineHeight: (typeof window !== 'undefined' ? window.localStorage.getItem('language') : 'undefined') === 'en' ? '1.5em' : '2em',
                                    boxDecorationBreak: 'clone',
                                    WebkitBoxDecorationBreak: 'clone',
                                    wordWrap: 'break-word',
                                    background: '#0ee6b0',
                                    color: '#000',
                                    paddingTop: '5px',
                                    paddingBottom: '5px'
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
                        className="mb-0 text-uppercase text-black-50"
                        style={{
                            fontSize: '0.6rem',
                            fontFamily: "'Inter Medium', 'Mon', sans-serif"
                        }}
                    >
                        {t('site.by')} 
                        <Link href="/author/[id]" as={`/author/${p._embedded.author[0].id}`}>
                            <a 
                                className="text-decoration-none text-dark ms-1 me-3 author-link"
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
        <>
            {
                Array(3).fill().map((item,index) => (
                    <div 
                        className="pb-3 mb-3 border-bottom menu-break-bp"
                        key={index}
                    >
                        <div className="">
                            <Skeleton height={200} />
                        </div>
                        <div 
                            className="px-3"
                            style={{
                                marginTop: '-1.8rem'
                            }}
                        >
                            <div className="mb-2">
                                <Skeleton count={2} />
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
                    </div>
                ))
            }
        </>
    )

    return (
        <div className="mb-5">
            <h4 
                className="mb-4 text-dark"
                style={{
                    fontSize: '1rem',
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif"
                }}
            >
                {t('site.breaking.news')}
            </h4>

            {list}
        </div>
    )
}

export default SideBreakingNews
