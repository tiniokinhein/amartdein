import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { NEWS } from '../../config/api'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'
import { BsArrowRightShort } from 'react-icons/bs'
import useSWR from 'swr'

const HomeEightGrid = () => {

    const { data: items } = useSWR(
        NEWS + '?per_page=8&_embed=1', 
        () => axios.get(NEWS + '?per_page=8&_embed=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { t } = useTranslation()

    const lists = items && items.slice(0,8).length ? (
        <>
            <h4 
                className="mb-0 pb-3 text-dark"
                style={{
                    fontSize: '1.2rem',
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                    borderBottom: '4px solid #e9ecef'
                }}
            >
                {/* {t('site.latest.news')} */}
                Markets
            </h4>
            <div className="row">
                {
                    items.slice(0,8).map((p) => (
                        <div 
                            key={p.id}
                            className="col-12 col-sm-6 col-lg-3 mt-4"
                        >
                            <div className="d-flex h-100">
                                <div className="news-readmore-link">
                                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                                        <a 
                                            className="text-decoration-none d-flex"
                                            style={{
                                                width: '90px',
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
                                        className="mb-2"
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
                        </div>
                    ))
                }
            </div>
        </>
    ) : (
        <>
            <div 
                className="mb-0 pb-3"
                style={{
                    borderBottom: '4px solid #e9ecef'
                }}
            >
                <Skeleton width={150} height={23} />
            </div>
            <div className="row">
                {
                    Array(8).fill().map((items,index) => (
                        <div 
                            key={index}
                            className="col-12 col-sm-6 col-lg-3 mt-4"
                        >
                            <div className="d-flex h-100">
                                <div>
                                    <Skeleton width={90} height={100} />
                                </div>
                                <div className="ps-3 flex-grow-1">
                                    <div 
                                        className="mb-2"
                                    >
                                        <Skeleton count={3} />
                                    </div>
                                    <div>
                                        <Skeleton width={'50%'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )

    return (
        <div className="pb-5">
            <div className="container">
                {lists}
            </div>
        </div>
    )
}

export default HomeEightGrid
