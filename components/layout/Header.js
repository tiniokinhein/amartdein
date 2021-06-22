import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import axios from 'axios'
import { HiOutlineMenu } from 'react-icons/hi'
import { FiSearch, FiSun } from 'react-icons/fi'
import { FaMoon } from 'react-icons/fa'
import NavLink from './NavLink'
import { useTranslation } from 'react-i18next'
import { BsThreeDots, BsToggleOff, BsToggleOn , BsArrowRightShort } from 'react-icons/bs'
import FollowUs from '../social/FollowUs'
import BreakingNews from '../menu/BreakingNews'
import RecentNews from '../menu/RecentNews'
import { IoClose } from 'react-icons/io5'
import { CATEGORIES, NEWS } from '../../config/api'
import Moment from 'react-moment'
import Skeleton from 'react-loading-skeleton'
import NewsMenu from '../menu/NewsMenu'
import useSWR from 'swr'
import { useDispatch, useSelector } from 'react-redux'
import { lightTheme , darkTheme } from '../../redux/theme/actions'
import { enLang , monLang } from '../../redux/lang/actions'
import i18next from 'i18next'


const Header = () => {

    const [style , setStyle] = React.useState({
        display: 'none',
        left: 0,
        top: '-100%',
        right: 0
    })
    const [newsStyle , setNewsStyle] = React.useState({
        display: 'none',
        left: 0,
        top: '-100%',
        right: 0
    })
    const [clickSearch , setClickSearch] = React.useState(false)
    const [search , setSearch] = React.useState('')
    const [itemResults , setItemResults] = React.useState([])
    const { t } = useTranslation()
    const router = useRouter()
    const theme = useSelector(state => state.theme)
    const lang = useSelector(state => state.language)
    const dispatch = useDispatch()

    const { data: cates } = useSWR(
        CATEGORIES + '?per_page=30',
        () => axios.get(CATEGORIES + '?per_page=30').then(res => res.data),
        { refreshInterval: 1000 }
    )

    const { data: items } = useSWR(
        NEWS + '?per_page=100&_embed=1',
        () => axios.get(NEWS + '?per_page=100&_embed=1').then(res => res.data),
        { refreshInterval: 1000 }
    )
    
    React.useEffect(() => {

        axios 
        .get(NEWS + '?_embed=1')
        .then(res => {
            const { data } = res
            setItemResults(data)
        })
        .catch(err => console.log(err.message))

    }, [])

    const openSidebar = () => {
        document.getElementById('sideBarMenu').classList.add('active-sidebar')
        
        document.body.style.position = 'absolute'
        document.body.style.height = '100vh'
        document.body.style.width = '100%'
        document.body.style.left = '0'
        document.body.style.overflowY = 'hidden'
    }

    const openSearch = () => {
        document.getElementById('openSearch').classList.add('active-search')
        setClickSearch(!clickSearch)
    }

    const closeSearch = () => {
        document.getElementById('openSearch').classList.remove('active-search')
        setClickSearch(!clickSearch)
        setSearch('')
    }

    const handleKeyUp = e => {
        e.preventDefault()
        if(e.key === 'Enter' && e.keyCode === 13) {
            if(search) {
                const text = search
                setSearch('')
                router.push({
                    pathname: '/search',
                    query: {
                        result: text
                    }
                })
                closeSearch()
            }
        }
    }

    const handleSearch = e => e.preventDefault()

    const desktopView = (
        <div
            className="d-none d-lg-flex align-items-center position-relative"
        >
            <div
                className="pe-5 d-flex align-items-center"
            >
                <button 
                    className="btn me-3 p-0 border-0 shadow-none btn-menu"
                    onClick={openSidebar}
                >
                    <HiOutlineMenu size="1.5rem" />
                </button>
                <Link href="/">
                    <a className="text-white text-decoration-none">
                        Amartdein
                    </a>
                </Link>
            </div>
            <div 
                className="d-flex flex-column border-start border-dark flex-grow-1"
            >
                <div
                    className="position-relative hl-div py-3 border-bottom border-dark ps-4"
                >
                    <p 
                        className="m-0 d-inline-block"
                        style={{
                            fontSize: '0.8rem',
                            color: 'rgba(255,255,255,.5)'
                        }}
                    >
                        {t('site.journal')}
                    </p>

                    <div className="float-end d-flex align-items-center">
                        <div className="d-flex">
                            {
                                theme.theme === 'dark' ? (
                                    <button 
                                        onClick={() => dispatch(lightTheme())} 
                                        className="d-flex align-items-center justify-content-between btn border-0 p-0 shadow-none btn-lng"
                                    >
                                        <span 
                                            className="d-inline-block"
                                            style={{
                                                marginTop: '-2px'
                                            }}
                                        >
                                            <FiSun size="0.75rem" color="#fff" />
                                        </span>
                                        <span 
                                            className="d-inline-block mx-2 span-toggle"
                                        >
                                            <BsToggleOn size="1.7rem" color="#fff" />
                                        </span>
                                        <span 
                                            className="d-inline-block"
                                            style={{
                                                marginTop: '-2px'
                                            }}
                                        >
                                            <FaMoon size="0.75rem" color="#fff" />
                                        </span>
                                    </button>
                                ) : (
                                    <button 
                                        onClick={() => dispatch(darkTheme())} 
                                        className="d-flex align-items-center justify-content-between btn border-0 p-0 shadow-none btn-lng"
                                    >
                                        <span 
                                            className="d-inline-block"
                                            style={{
                                                marginTop: '-2px'
                                            }}
                                        >
                                            <FiSun size="0.75rem" color="#fff" />
                                        </span>
                                        <span 
                                            className="d-inline-block mx-2 span-toggle"
                                        >
                                            <BsToggleOff size="1.7rem" color="#fff" />
                                        </span>
                                        <span 
                                            className="d-inline-block"
                                            style={{
                                                marginTop: '-2px'
                                            }}
                                        >
                                            <FaMoon size="0.75rem" color="#fff" />
                                        </span>
                                    </button>
                                )
                            }
                        </div>

                        <button
                            className="btn p-0 border-0 shadow-none ms-4 search-btn"
                            style={{
                                color: clickSearch ? '#848484' : '#fff',
                                marginTop: '-2px'
                            }}
                            onClick={clickSearch ? closeSearch : openSearch}
                        >
                            <FiSearch size="1.3rem" />
                        </button>
                    </div>
                </div>
                <div
                    className="ps-4 d-flex"
                >
                    <ul 
                        className="p-0 m-0 d-flex align-items-center list-unstyled"
                    >
                        <li
                            className="d-block h-100"
                        >
                            <NavLink href="/" activeClassName="a-link">
                                <a
                                    className="d-block text-decoration-none pe-4 py-3 bn-link"
                                    style={{
                                        fontFamily: "'Inter Bold', 'Mon', sans-serif",
                                        fontSize: '0.9rem',
                                        color: 'rgba(255,255,255,.5)',
                                        marginTop: '1.4px'
                                    }}
                                >
                                    {t('site.home')}
                                </a>
                            </NavLink>
                        </li>
                        <li
                            className="d-block h-100"
                        >
                            <button 
                                className="d-block btn border-0 shadow-none ps-0 pe-4 py-3 bn-link h-100"
                                style={{
                                    fontFamily: "'Inter Bold', 'Mon', sans-serif",
                                    fontSize: '0.9rem',
                                    color: 'rgba(255,255,255,.5)'
                                }}
                                onMouseEnter={() => setNewsStyle({
                                    display: 'block',
                                    left: 0,
                                    top: '100%',
                                    right: 0
                                })}
                                onMouseLeave={() => setNewsStyle({
                                    display: 'none',
                                    left: 0,
                                    top: '-100%',
                                    right: 0
                                })}
                            >
                                {t('site.news')}
                            </button>
                        </li>
                        <li
                            className="d-block h-100"
                        >
                            <button 
                                className="d-block pe-4 btn border-0 shadow-none ps-0 py-3 h-100"
                                onMouseEnter={() => setStyle({
                                    display: 'block',
                                    left: 0,
                                    top: '100%',
                                    right: 0
                                })}
                                onMouseLeave={() => setStyle({
                                    display: 'none',
                                    left: 0,
                                    top: '-100%',
                                    right: 0
                                })}
                            >
                                <BsThreeDots size="1.5rem" color="#fff" />
                            </button>
                        </li>
                    </ul>

                    <div 
                        className="ms-auto d-flex align-items-center border-start border-dark ps-4 py-3"
                    >
                        {
                            lang.language === 'en-Us' ? (
                                <button
                                    onClick={() => 
                                        i18next
                                        .changeLanguage('mon')
                                        .then(() => {
                                            dispatch(monLang())
                                        })
                                    }
                                    className="btn p-0 border-0 shadow-none bn-link"
                                    style={{
                                        color: 'rgba(255,255,255,.5)',
                                        fontFamily: "'Inter SemiBold', sans-serif",
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {t('site.lang')}
                                </button>
                            ) : (
                                <button
                                    onClick={() => 
                                        i18next
                                        .changeLanguage('en-Us')
                                        .then(() => {
                                            dispatch(enLang())
                                        })
                                    }
                                    className="btn p-0 border-0 shadow-none bn-link"
                                    style={{
                                        color: 'rgba(255,255,255,.5)',
                                        fontFamily: "'Mon', sans-serif",
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {t('site.lang')}
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>

            <div 
                className="position-absolute bg-theme border border-light border-end-0"
                style={{
                    ...style,
                    zIndex: 99
                }}
                onMouseEnter={e => setStyle({
                    display: 'block',
                    left: 0,
                    top: '100%',
                    right: 0
                })}
                onMouseLeave={e => setStyle({
                    display: 'none',
                    left: 0,
                    top: '-100%',
                    right: 0
                })}
                onClick={e => setStyle({
                    display: 'none',
                    left: 0,
                    top: '-100%',
                    right: 0
                })}
            >
                <div 
                    className="menu-scrollbar-design"
                    style={{
                        padding: '30px 40px',
                        height: '380px',
                        overflowY: 'scroll'
                    }}
                >
                    <div className="row mx-lg-n4">
                        <div className="col-lg-4 px-lg-4 border-end border-light">
                            <BreakingNews />
                        </div>
                        <div className="col-lg-4 px-lg-4 border-end border-light">
                            <RecentNews />
                        </div>
                        <div className="col-lg-4 px-lg-4">
                            <FollowUs />
                        </div>
                    </div>
                </div>
            </div>

            <div 
                className="position-absolute bg-theme border border-light border-end-0"
                style={{
                    ...newsStyle,
                    zIndex: 99
                }}
                onMouseEnter={e => setNewsStyle({
                    display: 'block',
                    left: 0,
                    top: '100%',
                    right: 0
                })}
                onMouseLeave={e => setNewsStyle({
                    display: 'none',
                    left: 0,
                    top: '-100%',
                    right: 0
                })}
                onClick={e => setNewsStyle({
                    display: 'none',
                    left: 0,
                    top: '-100%',
                    right: 0
                })}
            >
                <div 
                    className="px-4 menu-scrollbar-design"
                    style={{
                        paddingTop: '40px',
                        paddingBottom: '40px',
                        height: '380px',
                        overflowY: 'scroll'
                    }}
                >
                    <NewsMenu />
                </div>
            </div>
        </div>
    )

    const mobileView = (
        <div
            className="d-flex d-lg-none flex-column"
        >
            <div
                className="hl-div py-3 border-bottom border-dark row"
            >
                <p 
                    className="m-0 d-inline-block text-center"
                    style={{
                        fontSize: '0.8rem',
                        color: 'rgba(255,255,255,.5)'
                    }}
                >
                    {t('site.journal')}
                </p>
            </div>
            <div
                className="d-flex align-items-center justify-content-between position-relative"
            >
                <div
                    className="py-3"
                >
                    <button 
                        className="btn me-3 p-0 border-0 shadow-none btn-menu"
                        onClick={openSidebar}
                    >
                        <HiOutlineMenu size="1.5rem" />
                    </button>
                </div>
                <div
                    className="py-3"
                >
                    <Link href="/">
                        <a className="text-white text-decoration-none">
                            Amartdein
                        </a>
                    </Link>
                </div>
                <div 
                    className="d-flex align-items-center py-3"
                >
                    <div className="d-flex">
                        {
                            theme.theme === 'dark' ? (
                                <button 
                                    onClick={() => dispatch(lightTheme())} 
                                    className="btn border-0 p-0 shadow-none"
                                >
                                    <FiSun size="1.2rem" color="#fff" />
                                </button>
                            ) : (
                                <button 
                                    onClick={() => dispatch(darkTheme())} 
                                    className="btn border-0 p-0 shadow-none"
                                >
                                    <FaMoon size="1.2rem" color="#fff" />
                                </button>
                            )
                        }
                    </div>
                    
                    <button
                        className="btn p-0 border-0 shadow-none ms-4 search-btn"
                        style={{
                            color: clickSearch ? '#848484' : '#fff',
                            marginTop: '-2px'
                        }}
                        onClick={clickSearch ? closeSearch : openSearch}
                    >
                        <FiSearch size="1.3rem" />
                    </button>
                </div>
            </div>
        </div>
    )

    const searchInput = (
        <form 
            autoComplete="off"
            onSubmit={handleSearch}
        >
            <div className="d-flex align-items-center border-b-change-color pb-3">
                <span
                    style={{
                        color: '#fff'
                    }}
                >
                    <FiSearch size="1.3rem" />
                </span>
                <input 
                    type="text"
                    name="search"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyUp={handleKeyUp}
                    className="form-control rounded-0 border-0 shadow-none p-0 mx-4 bg-transparent"
                    style={{
                        fontSize: '0.85rem',
                        color: '#fff',
                        lineHeight: 2,
                        fontFamily: "'Inter Regular', 'Mon', sans-serif"
                    }}
                    placeholder={t('site.search.topics')}
                />
            </div>
        </form>
    )

    const latestNews = items && items.slice(0,4).length ? (
        <div className="my-5">
            <h4 
                className="mb-3"
                style={{
                    fontSize: '1rem',
                    color: '#f8f9fa',
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif"
                }}
            >
                {t('site.the.latest')}
            </h4>

            <div className="row mx-lg-n4">
                {
                    items.slice(0,4).map((p) => (
                        <div 
                            className="col-12 col-sm-6 col-lg-3 mb-3 mb-lg-0 px-lg-4 d-flex menu-border-end" 
                            key={p.id}
                        >
                            <div className="">
                                <Link href="/news/[id]" as={`/news/${p.id}`}>
                                    <a 
                                        className="d-block text-decoration-none rounded-circle shadow"
                                        style={{
                                            width: '80px',
                                            height: '80px',
                                            background: "url("+ p.acf.image.url +") no-repeat center / cover"
                                        }}
                                        onClick={closeSearch}
                                    />
                                </Link>
                            </div>
                            <div className="ps-3 d-flex flex-column">
                                <h4 
                                    className="mb-2 overflow-hidden"
                                    style={{
                                        lineHeight: '1em'
                                    }}
                                >
                                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                                        <a 
                                            className="text-decoration-none text-capitalize title-link overflow-hidden"
                                            style={{
                                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                                fontSize: '0.9rem',
                                                color: '#fff',
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical'
                                            }}
                                            dangerouslySetInnerHTML={{
                                                __html: t('a.d', {
                                                    d_en: p.title.rendered,
                                                    d_mon: p.acf.title_mon
                                                })
                                            }}
                                            onClick={closeSearch}
                                        />
                                    </Link>
                                </h4>
                                <p
                                    className="m-0 text-uppercase"
                                    style={{
                                        fontSize: '0.55rem',
                                        color: '#858585',
                                        fontFamily: "'Inter Medium', sans-serif"
                                    }}
                                >
                                    <Moment fromNow>
                                        {p.date}
                                    </Moment>
                                </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    ) : (
        <div className="my-5">
            <div 
                className="mb-3"
            >
                <Skeleton height={19} width={100} />
            </div>

            <div className="row mx-lg-n4">
                {
                    Array(4).fill().map((item,index) => (
                        <div 
                            className="col-12 col-sm-6 col-lg-3 mb-3 mb-lg-0 px-lg-4 d-flex menu-border-end" 
                            key={index}
                        >
                            <div className="">
                                <Skeleton width={80} height={80} circle={true} />
                            </div>
                            <div className="ps-3 flex-grow-1">
                                <div className="mb-3">
                                    <Skeleton count={2} />
                                </div>
                                <Skeleton height={11} width={90} />
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )

    const categories = cates && cates.filter(fr => fr.count >= 1).slice(0,6).length ? (
        <div>
            <ul className="list-unstyled m-0 p-0">
                {
                    cates
                    .filter(fr => fr.count >= 1)
                    .slice(0,6)
                    .map((p) => (
                        <li className="d-inline-block" key={p.id}>
                            <Link href="/category/[id]" as={`/category/${p.id}`}>
                                <a 
                                    className="text-decoration-none px-2 py-1 me-2 text-lowercase btn-cat-tran"
                                    style={{
                                        color: '#fff',
                                        fontSize: '0.7rem'
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: t('a.d', {
                                            d_en: p.name,
                                            d_mon: p.acf.title_mon
                                        })
                                    }}
                                    onClick={closeSearch}
                                />
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    ) : (
        <div>
            <ul className="list-unstyled m-0 p-0">
                {
                    Array(6).fill().map((item,index) => (
                        <li className="d-inline-block me-2" key={index}>
                            <Skeleton height={24} width={80} />
                        </li>
                    ))
                }
            </ul>
        </div>
    )

    const irDatas = itemResults.filter(fr => 
        fr.title.rendered.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        fr.acf.title_mon.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        fr.acf.content_en.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        fr.acf.content_mon.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        fr._embedded.author[0].acf.full_name_en.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
        fr._embedded.author[0].acf.full_name_mon.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )

    const searchResult = irDatas.length ? (
        irDatas.slice(0,3).map((p) => (
            <div 
                className="p-2 border-b-change-color no-last-border d-flex justify-content-between align-items-center" 
                key={p.id}
                style={{
                    cursor: 'pointer'
                }}
            >
                <div className="d-flex">
                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                        <a 
                            className="text-decoration-none"
                            onClick={closeSearch}
                        >
                            <img 
                                src={p.acf.image.url}
                                alt=""
                                style={{
                                    width: '50px',
                                    height: '50px',
                                    objectFit: 'cover'
                                }}
                            />
                        </a>
                    </Link>
                    <div className="ps-3">
                        <h4 
                            className="mb-1"
                            style={{
                                lineHeight: '1em'
                            }}
                        >
                            <Link href="/news/[id]" as={`/news/${p.id}`}>
                                <a 
                                    className="text-decoration-none title-link"
                                    style={{
                                        fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                        fontSize: '1rem',
                                        color: '#fff'
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html: t('a.d', {
                                            d_en: p.title.rendered,
                                            d_mon: p.acf.title_mon
                                        })
                                    }}
                                    onClick={closeSearch}
                                />
                            </Link>
                        </h4>
                        <p
                            className="m-0 text-uppercase"
                            style={{
                                fontSize: '0.55rem',
                                color: '#858585',
                                fontFamily: "'Inter Medium', sans-serif"
                            }}
                        >
                            <Moment format="DD MMMM , YYYY">
                                {p.date}
                            </Moment>
                        </p>
                    </div>
                </div>
                <div className="ms-2">
                    <Link href="/news/[id]" as={`/news/${p.id}`}>
                        <a 
                            className="text-decoration-none"
                            style={{
                                color: '#fff'
                            }}
                            onClick={closeSearch}
                        >
                            <BsArrowRightShort size="1.5rem" />
                        </a>
                    </Link>
                </div>
            </div>
        ))
    ) : (
        <div className="p-3 d-flex align-items-center">
            <p 
                className="m-0"
                style={{
                    fontSize: '0.9rem',
                    color: '#858585',
                    fontFamily: "'Inter Medium', 'Mon' , sans-serif"
                }}
            >
                {t('site.not.found')}
            </p>
        </div>
    )

    return (
        <div
            className="bkg-banner border-bottom border-dark"
        >
            <div className="container">
                {mobileView}
                {desktopView}
            </div>

            <div 
                id="openSearch"
                className="position-absolute"
                style={{
                    left: 0,
                    right: 0
                }}
            >
                <div
                    className="bg-search-theme"
                >
                    <div className="container position-relative">
                        <button 
                            className="btn p-0 border-0 rounded-0 shadow-none position-absolute"
                            style={{
                                color: '#fff',
                                right: '6px',
                                top: '38px'
                            }}
                            onClick={closeSearch}
                        >
                            <IoClose size="1.5rem" />
                        </button>
                        
                        <div
                            style={{
                                padding: '40px 0'
                            }}
                        >
                            {searchInput}

                            {
                                search.length >= 3 ? (
                                    <div>
                                        {searchResult}
                                    </div>
                                ) : (
                                    <div className="d-none d-sm-block">
                                        {latestNews}
                                        {categories}
                                    </div>                            
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Header
