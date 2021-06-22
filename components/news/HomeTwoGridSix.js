import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { NEWS } from '../../config/api'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'
import { BsArrowRightShort } from 'react-icons/bs'
import useSWR from 'swr'

const HomeTwoGridSix = () => {

    const { data: items } = useSWR(
        NEWS + '?per_page=8&_embed=1', 
        () => axios.get(NEWS + '?per_page=8&_embed=1').then(res => res.data),
        {
            refreshInterval: 1000
        }
    )

    const { t } = useTranslation()
    const router = useRouter()

    const leftList = items && items.slice(0,1).length ? (
        items.slice(0,1).map((p) => (
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

    const rightList = items && items.slice(1,2).length ? (
        items.slice(1,2).map((p) => (
            <div 
                key={p.id}
                className="h-100"
            >
                <div className="position-relative news-readmore-link">
                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                        <a className="text-decoration-none">
                            <img 
                                src={p.acf.image.url}
                                alt=""
                                className="w-100"
                                style={{
                                    height: '270px',
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
                    className="list-unstyled mt-3 mb-0 mx-0 p-0"
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
                    <span className="c-date ps-2 float-end">
                        <Moment format="DD MMMM , YYYY">
                            {p.date}
                        </Moment>
                    </span>
                </p>
                
            </div>
        ))
    ) : (
        Array(1).fill().map((items,index) => (
            <div 
                key={index}
                className="h-100"
            >
                <Skeleton height={270} />
                <div className="mt-3">
                    <Skeleton width={100} height={14} />
                </div>
                <div className="mt-2 mb-3">
                    <Skeleton count={2} height={25} />
                </div>

                <div>
                    <span>
                        <Skeleton height={14} width={100} />
                    </span>
                    <span className="float-end">
                        <Skeleton height={14} width={100} />
                    </span>
                </div>
            </div>
        ))
    )

    const lists = items && items.slice(2,8).length ? (
        <div className="row pt-2">
            {
                items.slice(2,8).map((p) => (
                    <div 
                        key={p.id}
                        className="col-12 col-md-4"
                    >
                        <div className="d-flex h-100 py-3 border-top border-light">
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
    ) : (
        <div className="row pt-2">
            {
                Array(6).fill().map((items,index) => (
                    <div 
                        key={index}
                        className="col-12 col-md-4"
                    >
                        <div className="d-flex h-100 py-3 border-top border-light">
                            <div>
                                <Skeleton width={100} height={100} />
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
    )

    return (
        <div className="pb-5">
            <div className="container">
                {
                    items && items.slice(0,1).length ? (
                        <h4 
                            className="mb-4 pb-3 text-dark"
                            style={{
                                fontSize: '1.2rem',
                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                borderBottom: '4px solid #e9ecef'
                            }}
                        >
                            {/* {t('site.latest.news')} */}
                            Politics
                        </h4>
                    ) : (
                        <div 
                            className="mb-4 pb-3"
                            style={{
                                borderBottom: '4px solid #e9ecef'
                            }}
                        >
                            <Skeleton width={150} height={23} />
                        </div>
                    )
                }

                <div className="row">
                    <div className="col-12 col-md-8 mb-4 mb-md-3">
                        {leftList}
                    </div>
                    <div className="col-12 col-md-4 mb-4 mb-md-3">
                        {rightList}
                    </div>
                    <div className="col-12">
                        {lists}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomeTwoGridSix
