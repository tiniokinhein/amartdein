import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { NEWS } from '../../config/api'
import { GoGraph } from 'react-icons/go'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'

const MostViewedNews = () => {

    const { data: items } = useSWR(
        NEWS + '?per_page=100&_embed=1', 
        () => axios.get(NEWS + '?per_page=100&_embed=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )
    const { t } = useTranslation()
    

    const numFormatter = (num) => {
        if(num > 999 && num < 1000000) {
            return (num/1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million 
        } else if(num >= 1000000) {
            return (num/1000000).toFixed(1) + 'M' // convert to M for number from > 1 million 
        } else if(num < 900) {
            return num // if value < 1000, nothing to do
        }
    }

    const lists = items && 
        items
        .filter(fr => fr.meta.views >= 2)
        .sort((a,b) => {
            if(a.meta.views > b.meta.views) return -1
            return 0
        })
        .slice(0,5).length ? (
            <div className="pt-1">
                {
                    items
                    .filter(fr => fr.meta.views >= 2)
                    .sort((a,b) => {
                        if(a.meta.views > b.meta.views) return -1
                        return 0
                    })
                    .slice(0,5)
                    .map((p,index) => (
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
                                            style={{
                                                fontFamily: "'Inter Bold', 'Mon', sans-serif",
                                                fontSize: '2rem',
                                                color: '#fff'
                                            }}
                                        >
                                            {index + 1}
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
                                                display: "-webkit-box",
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
                                    <span><GoGraph size="0.8rem" /></span> {numFormatter(p.meta.views)} {t('site.views')}
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

    return (
        <div className="pb-5">
            {
                items && 
                items
                .filter(fr => fr.meta.views >= 2)
                .sort((a,b) => {
                    if(a.meta.views > b.meta.views) return -1
                    return 0
                })
                .slice(0,5).length ? (
                    <>
                        <h4 
                            className="mb-3 pb-3 text-dark"
                            style={{
                                fontSize: '1.2rem',
                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                borderBottom: '4px solid #e9ecef'
                            }}
                        >
                            {t('site.most.viewed')}
                        </h4>
            
                        {lists}
                    </>
                ) : null
            }
        </div>
    )
}

export default MostViewedNews
