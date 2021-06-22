import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'
import { CATEGORIES, NEWS } from '../../config/api'
import { useTranslation } from 'react-i18next'
import Skeleton from 'react-loading-skeleton'
import Moment from 'react-moment'
import { BiTime } from 'react-icons/bi'
import { GoGraph } from 'react-icons/go'
import BeatLoader from 'react-spinners/BeatLoader'
import useSWR from 'swr'

const NewsMenu = () => {

    const [news , setNews] = React.useState([])
    const [style , setStyle] = React.useState({
        display: 'none',
        visibility: 'hidden'
    })
    const [cid , setCid] = React.useState(1)
    const [loading , setLoading] = React.useState(true)
    const { t } = useTranslation()
    const router = useRouter()

    const { data: items } = useSWR(
        CATEGORIES + '?per_page=30',
        () => axios.get(CATEGORIES + '?per_page=30').then(res => res.data.sort((a,b) => {
            if(a.id < b.id) return -1
            return 0
        }).filter(fr => fr.count >= 1)),
        { refreshInterval: 1000 }
    )

    React.useEffect(() => {

        setLoading(true)
        setStyle({
            display: 'none',
            visibility: 'hidden'
        })

        axios
        .get(NEWS + `?categories=${cid}&per_page=4&_embed=1`)
        .then(res => {
            const { data } = res 
            setNews(data)
            setStyle({
                display: 'flex',
                visibility: 'visible'
            })
            setLoading(false)
        })
        .catch(err => console.log(err.message))     

    }, [cid])

    const numFormatter = (num) => {
        if(num > 999 && num < 1000000) {
            return (num/1000).toFixed(1) + 'K' // convert to K for number from > 1000 < 1 million 
        } else if(num >= 1000000) {
            return (num/1000000).toFixed(1) + 'M' // convert to M for number from > 1 million 
        } else if(num < 900) {
            return num // if value < 1000, nothing to do
        }
    }

    const nameLists = items && items.length ? (
        items.map((p) => {

            const opacity = p.id === cid ? '1' : '0.5'

            return(
                <div 
                    key={p.id}
                    className="border-bottom border-light pb-2 mb-2 ms-4"
                >
                    <button 
                        id="catLinkName"
                        className="btn border-0 rounded-0 shadow-none p-0 w-100 text-start text-dark cat-link-name-hover"
                        style={{
                            fontSize: '0.9rem',
                            fontFamily: "'Inter Medium', 'Mon', sans-serif",
                            opacity
                        }}
                        onMouseOver={() => setCid(p.id)}
                        onClick={() => router.push(`/category/${p.id}`)}
                    >
                        {t('a.d', {
                            d_en: p.name,
                            d_mon: p.acf.title_mon
                        })}
                    </button>
                </div>
            )
        })
    ) : (
        Array(4).fill().map((item,index) => (
            <div 
                key={index}
                className="border-bottom border-light pb-2 mb-2 ms-4"
            >
                <div className="">
                    <Skeleton height={16} />
                </div>
            </div>
        ))
    )

    const newsLists = news.length ? (
        <div 
            className="row tabContent" 
            id="tabContent"
            style={style}
        >
            {
                news.map((p) => (
                    <div className="col-lg-3" key={p.id}>
                        <div 
                            className="news-readmore-link"
                        >
                            <Link href="/news/[id]" as={`/news/${p.id}`}>
                                <a 
                                    className="text-decoration-none w-100 d-flex"
                                    style={{
                                        height: '150px',
                                        background: "url("+ p.acf.image.url +") no-repeat center / cover"
                                    }}
                                >
                                    <span 
                                        className="w-100 d-flex flex-column justify-content-between align-items-center"
                                    >
                                        <span 
                                            style={{
                                                marginTop: '35%',
                                                fontSize: '0.8rem',
                                                color: '#fff',
                                                fontFamily: "'Inter Bold', 'Mon', sans-serif"
                                            }}
                                        >
                                            {t('site.read.more')}
                                        </span>
                                        <span 
                                            className="text-uppercase"
                                            style={{
                                                fontSize: '0.6rem',
                                                color: '#efefef'
                                            }}
                                        >
                                            <BiTime />
                                            <span 
                                                className="ms-1 mb-3 d-inline-block"
                                                style={{
                                                    color: '#fff'
                                                }}
                                            >
                                                {t('a.d', {
                                                    d_en: p.acf.read_en,
                                                    d_mon: p.acf.read_mon
                                                })}
                                            </span>
                                        </span>
                                    </span>
                                </a>
                            </Link>
                        </div>
                        <h4 
                            className="my-3 overflow-hidden"
                        >
                            <Link href="/news/[id]" as={`/news/${p.id}`}>
                                <a 
                                    className="text-decoration-none text-capitalize text-dark title-link overflow-hidden"
                                    style={{
                                        fontFamily: "'Inter Bold','Mon', sans-serif",
                                        fontSize: '1rem',
                                        transition: '0.3s linear',
                                        display: "-webkit-box",
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
                            className="m-0 text-uppercase text-black-50 d-flex align-items-center justify-content-between"
                            style={{
                                fontSize: '0.6rem'
                            }}
                        >
                            <span>
                                <GoGraph size="0.8rem" /> {numFormatter(p.meta.views)} {t('site.views')}
                            </span>
                            <span className="c-date ps-2 ms-3">
                                <Moment format="DD MMMM , YYYY">
                                    {p.date}
                                </Moment>
                            </span>
                        </p>
                    </div>
                ))
            }
        </div>
    ) : (
        <div 
            className="row tabContent" 
            id="tabContent"
            style={style}
        >
            {
                Array(4).fill().map((item,index) => (
                    <div className="col-lg-3" key={index}>
                        <div>
                            <Skeleton height={150} />
                        </div>
                        <div
                            className="my-3"
                        >
                            <Skeleton height={20} count={4} />
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="flex-grow-1">
                                <Skeleton height={11} width={'60%'} />
                            </div>
                            <div className="flex-grow-1 text-end">
                                <Skeleton height={11} width={'70%'} />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )

    return (
        <div className="row mx-lg-n4">
            <div className="col-lg-3 px-lg-4">
                {nameLists}
            </div>
            <div className="col-lg-9 px-lg-4 position-relative">
                {
                    loading ? (
                        <div 
                            className="position-absolute d-flex align-items-center justify-content-center"
                            style={{
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0
                            }}
                        >
                            <BeatLoader size={10} color={'#0ee6b0'} />
                        </div>
                    ) : newsLists
                }
            </div>
        </div>
    )
}

export default NewsMenu
