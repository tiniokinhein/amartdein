import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { NEWS } from '../../config/api'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'

const BreakingNews = () => {

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
                className="pb-3 mb-3 border-bottom border-light d-flex align-items-center menu-break-bp"
                key={p.id}
            >
                <Link href="/news/[id]" as={`/news/${p.id}`}>
                    <a 
                        className="text-decoration-none"
                    >
                        <img 
                            src={p.acf.image.url}
                            alt=""
                            style={{
                                width: '100px',
                                height: '80px',
                                objectFit: 'cover'
                            }}
                        />
                    </a>
                </Link>
                <div className="ps-3">
                    <h4 
                        className="mb-0 overflow-hidden"
                    >
                        <Link href="/news/[id]" as={`/news/${p.id}`}>
                            <a 
                                className="text-decoration-none text-capitalize text-dark title-link overflow-hidden"
                                style={{
                                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                    fontSize: '0.95rem',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 3,
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
            </div>
        ))
    ) : (
        <>
            {
                Array(3).fill().map((item,index) => (
                    <div 
                        className="pb-3 mb-3 border-bottom border-light d-flex align-items-center menu-break-bp"
                        key={index}
                    >
                        <div className="">
                            <Skeleton width={100} height={80} />
                        </div>
                        <div className="ps-3 flex-grow-1">
                            <Skeleton count={2} />
                        </div>
                    </div>
                ))
            }
        </>
    )

    return (
        <div className="">
            <h4 
                className="mb-3 pb-3 text-dark"
                style={{
                    fontSize: '1.2rem',
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                    borderBottom: '4px solid #e9ecef'
                }}
            >
                {t('site.breaking.news')}
            </h4>

            {list}
        </div>
    )
}

export default BreakingNews
