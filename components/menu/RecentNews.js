import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { NEWS } from '../../config/api'
import Skeleton from 'react-loading-skeleton'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import useSWR from 'swr'

const RecentNews = () => {

    const { data: items } = useSWR(
        NEWS + '?per_page=100&_embed=1',
        () => axios.get(NEWS + '?per_page=100&_embed=1').then(res => res.data),
        { refreshInterval: 1000 }
    )
    const { t } = useTranslation()

    const list = items && items.filter(fr => fr._embedded['wp:term'][0].find(f => f.id !== 1)).slice(0,3).length ? (
        items
        .filter(fr => fr._embedded['wp:term'][0].find(f => f.id !== 1))
        .slice(0,3)
        .map((p) => (
            <div 
                className="pb-3 mb-3 border-bottom border-light menu-break-bp"
                key={p.id}
            >
                <h4 
                    className="mb-2"
                >
                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                        <a 
                            className="text-decoration-none text-capitalize text-dark title-link"
                            style={{
                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                fontSize: '1rem',
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
                        fontFamily: "'Inter Bold', sans-serif"
                    }}
                >
                    <Moment format="DD MMMM , YYYY">
                        {p.date}
                    </Moment>
                </p>
            </div>
        ))
    ) : (
        <>
            {
                Array(3).fill().map((item,index) => (
                    <div 
                        className="pb-3 mb-3 border-bottom border-light menu-break-bp"
                        key={index}
                    >
                        <div className="mb-2">
                            <Skeleton count={2} />
                        </div>
                        <Skeleton height={12} width={'50%'} />
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
                {t('site.recent.news')}
            </h4>

            {list}
        </div>
    )
}

export default RecentNews
