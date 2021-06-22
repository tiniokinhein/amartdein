import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoClose } from 'react-icons/io5'
import SideBreakingNews from '../menu/SideBreakingNews'
import SideFollowUs from '../menu/SideFollowUs'
import SideRecentNews from '../menu/SideRecentNews'
import NavLink from './NavLink'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import { CATEGORIES } from '../../config/api'
import axios from 'axios'
import Skeleton from 'react-loading-skeleton'
import useSWR from 'swr'
import { useDispatch, useSelector } from 'react-redux'
import i18next from 'i18next'
import { enLang, monLang } from '../../redux/lang/actions'

const SideBar = () => {

    const { data: items } = useSWR(
        CATEGORIES + '?per_page=30&orderby=id&order=asc',
        () => axios.get(CATEGORIES + '?per_page=30&orderby=id&order=asc').then(res => res.data),
        { refreshInterval: 1000 }
    )

    const lang = useSelector(state => state.language)
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const closeSidebar = () => {
        document.getElementById('sideBarMenu').classList.remove('active-sidebar')

        document.body.style.position = ''
        document.body.style.height = ''
        document.body.style.width = ''
        document.body.style.right = ''
        document.body.style.overflowY = ''
    }

    const menuLinks = (
        <Accordion 
            className="mb-2 w-100 sidemenu-accordion" 
            allowMultipleExpanded={true}
            allowZeroExpanded={true}
        >
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton 
                        className="bg-transparent p-0 outline-0"
                    >
                        <NavLink 
                            href="/"
                            activeClassName=""
                        >
                            <a
                                className="d-block text-decoration-none py-2 mobile-bn-link border-bottom border-light"
                                style={{
                                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                    fontSize: '1rem',
                                    color: 'rgba(0,0,0,.5)'
                                }}
                                onClick={closeSidebar}
                            >
                                {t('site.home')}
                            </a>
                        </NavLink>
                    </AccordionItemButton>
                </AccordionItemHeading>
            </AccordionItem>

            <AccordionItem className="border-bottom border-light">
                <AccordionItemHeading>
                    <AccordionItemButton 
                        className="accordion__button bg-transparent px-0 py-2 outline-0"
                        style={{
                            fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                            fontSize: '1rem',
                            color: 'rgba(0,0,0,.5)'
                        }}
                    >
                        {t('site.news')}
                    </AccordionItemButton>
                </AccordionItemHeading>
                {
                    items && items.filter(fr => fr.count >= 1).length ? (
                        items.filter(fr => fr.count >= 1).map((p) => (
                            <AccordionItemPanel
                                key={p.id}
                                className="bg-transparent p-0 outline-0"
                                onClick={closeSidebar}
                            >
                                <NavLink  
                                    href={{
                                        pathname: '/category/[id]',
                                        query: {
                                            id: p.id
                                        }
                                    }}
                                    activeClassName="a-link"
                                >
                                    <a
                                        className="d-block text-decoration-none pb-2 mobile-bn-link"
                                        style={{
                                            fontFamily: "'Inter Regular', 'Mon', sans-serif",
                                            fontSize: '0.9rem',
                                            color: 'rgba(0,0,0,.5)'
                                        }}
                                    >
                                        {t('a.d', {
                                            d_en: p.name,
                                            d_mon: p.acf.title_mon
                                        })}
                                    </a>
                                </NavLink>
                            </AccordionItemPanel>
                        ))
                    ) : (
                        Array(4).fill().map((item,index) => (
                            <AccordionItemPanel
                                key={index}
                                className="bg-transparent p-0 outline-0"
                                onClick={closeSidebar}
                            >
                                <div className="pb-2">
                                    <Skeleton width={'60%'} />
                                </div>
                            </AccordionItemPanel>
                        ))
                    )
                }
            </AccordionItem>
        </Accordion>
    )

    return (
        <div
            id="sideBarMenu"
            className="position-fixed w-100"
        >
         
            <div 
                className="float-start col-12 col-sm-8 col-md-6 col-lg-3 h-100 bg-theme"
            >
                <div 
                    className="sticky-top bkg-banner py-3 px-4 border-bottom border-dark"
                    style={{
                        height: '60px'
                    }}
                >
                    Amartdein
                    <button 
                        onClick={closeSidebar}
                        className="btn border-0 p-0 shadow-none text-light float-end btn-sidebar-close"
                    >
                        <IoClose size="1.5rem" />
                    </button>
                </div>
                
                <aside
                    className="h-100 aside-scroll"
                    style={{
                        overflowY: 'scroll'
                    }}
                >
                    <div 
                        className="p-4"
                        style={{
                            marginBottom: '60px'
                        }}
                    >
                        <div className="d-block d-lg-none">
                            {menuLinks}
                            
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
                                        className="btn p-0 border-0 shadow-none mb-5 text-dark"
                                        style={{
                                            fontFamily: "'Inter SemiBold', sans-serif",
                                            fontSize: '1rem'
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
                                        className="btn p-0 border-0 shadow-none mb-5 text-dark"
                                        style={{
                                            fontFamily: "'Mon', sans-serif",
                                            fontSize: '1rem'
                                        }}
                                    >
                                        {t('site.lang')}
                                    </button>
                                )
                            }
                        </div>

                        <div 
                            onClick={closeSidebar}
                        >

                            <SideFollowUs />
                            <SideBreakingNews />
                            <SideRecentNews />
                        </div>
                    </div>
                </aside>
            </div>
            <div 
                className="float-end col-0 col-sm-4 col-md-6 col-lg-9 h-100 px-0 sidebar-bg-overlay"
                style={{
                    overflowY: 'scroll'
                }}
                style={{
                    background: 'rgba(0,0,0,0.7)',
                    cursor: 'pointer'
                }}
                onClick={closeSidebar}
            />
      
        </div>
    )
}

export default SideBar
