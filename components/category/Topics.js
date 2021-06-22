import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { CATEGORIES } from '../../config/api'
import { BsArrowRightShort } from 'react-icons/bs'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'

const Topics = () => {

    const { data: items } = useSWR(
        CATEGORIES + '?per_page=30', 
        () => axios.get(CATEGORIES + '?per_page=30').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )
    const { t } = useTranslation()

    const lists = items && items.length ? (
        <div className="pt-1">
            {
                items.filter(fr => fr.count >= 1).map((p) => (
                    <div 
                        key={p.id}
                        className="mb-2 position-relative link-arr-wrapper"
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
                Array(5).fill().map((item,index) => (
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
        <div className="">
            {
                items && items.filter(fr => fr.count >= 1).length ? (
                    <>
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

                        {lists}
                    </>
                ) : null
            }
        </div>
    )
}

export default Topics
