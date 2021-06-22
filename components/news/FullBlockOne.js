import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import { NEWS } from '../../config/api'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'

const FullBlockOne = () => {

    const { data: items } = useSWR(
        NEWS + '?per_page=5&_embed=1', 
        () => axios.get(NEWS + '?per_page=5&_embed=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )
    const { t } = useTranslation()

    const itemList = items && items.slice(0,1).length ? (
        items.slice(0,1).map((p) => (
            <div 
                className="row" 
                key={p.id}
            >
                <div className="col-12 col-lg-7">
                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                        <a className="text-decoration-none">
                            <img 
                                src={p.acf.image.url}
                                alt=""
                                className="w-100 margin-b-negative-5"
                                style={{
                                    height: '450px',
                                    objectFit: 'cover'
                                }}
                            />
                        </a>
                    </Link>
                </div>
                <div className="col-12 col-lg-5">
                    <div className="d-flex flex-column h-100 justify-content-end px-4 px-lg-0">
                        <div className="margin-top-negative-5">
                            <ul 
                                className="list-unstyled m-0 p-0"
                            >
                                {
                                    p._embedded['wp:term'][0].map((m) => (
                                        <li key={m.id} className="d-inline-block">
                                            <Link href="/category/[id]" as={`/category/${m.id}`}>
                                                <a
                                                    className="text-decoration-none text-uppercase me-3 p-2 p-lg-0 bg-lg-black"
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
                                className="my-3 margin-left-negative-5 overflow-hidden"
                            >
                                <Link href="/news/[id]" as={`/news/${p.id}`}>
                                    <a 
                                        className="text-decoration-none text-capitalize px-3 overflow-hidden"
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
                                className="m-0 text-uppercase"
                                style={{
                                    color: 'rgba(255,255,255,.5)',
                                    fontSize: '0.7rem'
                                }}
                            >
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
                </div>
            </div>
        ))
    ) : (
        <div 
            className="row" 
        >
            <div className="col-12 col-lg-7">
                <Skeleton height={450} />
            </div>
            <div className="col-12 col-lg-5">
                <div className="d-flex flex-column h-100 justify-content-center px-4 px-lg-0">
                    <div className="margin-top-negative-5">
                        <div>
                            <Skeleton width={60} />
                        </div>
                        <div
                            className="my-3 margin-left-negative-5"
                        >
                            <Skeleton height={70} count={2} />
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
            </div>
        </div>
    )

    const itemsList = items && items.slice(1,5).length ? (
        <div className="row mx-0">
            {
                items.slice(1,5).map((p,index) => (
                    <div className="col-12 col-md-6 col-lg-3 px-0" key={p.id}>
                        <div 
                            className="p-4 h-100 w-100 img-hover-link"
                            style={{
                                background: "url(" + p.acf.image.url + ") no-repeat center / cover"
                            }}
                        >
                            <div className="d-flex">
                                <h1
                                    className="m-0 pe-4"
                                    style={{
                                        transition: '0.3s linear',
                                        color: '#ced4da'
                                    }}
                                >
                                    {index + 1}
                                </h1>
                                <div className="ps-3">
                                    <h4 
                                        className="mb-3 overflow-hidden"
                                    >
                                        <Link href="/news/[id]" as={`/news/${p.id}`}>
                                            <a 
                                                className="text-decoration-none text-capitalize text-dark overflow-hidden"
                                                style={{
                                                    fontFamily: "'Inter ExtraBold','Mon', sans-serif",
                                                    fontSize: '1rem',
                                                    transition: '0.3s linear',
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
                                    <p
                                        className="m-0 text-uppercase text-secondary"
                                        style={{
                                            fontSize: '0.7rem',
                                            fontFamily: "'Inter Medium', sans-serif",
                                            transition: '0.3s linear'
                                        }}
                                    >
                                        <Moment format="DD MMMM , YYYY">
                                            {p.date}
                                        </Moment>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div> 
                ))
            }
        </div>
    ) : (
        <div className="row mx-0">
            {
                Array(4).fill().map((item,index) => (
                    <div className="col-12 col-md-6 col-lg-3 px-0" key={index}>
                        <Skeleton height={200} />
                    </div>
                ))
            }
        </div>
    )

    return (
        <>
            <div
                className="py-5 mb-0 mb-lg-5"
                style={{
                    background: '#0a0a0a'
                }}
            >
                <div className="container">
                    {itemList}
                </div>
            </div>
            <div className="bg-theme py-5">
                <div className="container">
                    {itemsList}
                </div>
            </div>
        </>
    )
}

export default FullBlockOne
