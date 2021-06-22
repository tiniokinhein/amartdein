import React from 'react'
import Sticky from 'react-sticky-el'
import Header from './Header'
import Footer from './Footer'
import { AiOutlineArrowUp } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const Layout = (props) => {

    const [showScroll , setShowScroll] = React.useState(false)
    const theme = useSelector(state => state.theme)

    React.useEffect(() => {
        typeof window !== 'undefined' ? window.addEventListener('scroll', () => {
            if(window.pageYOffset > 300) {
                setShowScroll(true)
            }
            if(window.pageYOffset <= 300) {
                setShowScroll(false)
            }
        }) : 'undefined'

        if(theme) {
            document.documentElement.className = theme.theme
        }

    }, [theme])

    const clickScrollTop = () => {
        typeof window !== 'undefined' ? window.scrollTo({
            top: 0,
            behavior: 'smooth'
        }) : 'undefined'
    }
    
    const scrollBtn = (
        <AiOutlineArrowUp
            onClick={clickScrollTop}
            className="text-light rounded-circle shadow position-fixed"
            style={{
                background: '#0a0a0a',
                height: '34px',
                width: '34px',
                display: showScroll ? 'flex' : 'none',
                right: '20px',
                bottom: '50px',
                zIndex: 999,
                cursor: 'pointer',
                padding: '10px'
            }}
        />
    )

    return (
        <>
            <Sticky 
                topOffset={60} 
            >
                <Header />
            </Sticky>

            <main>
                {props.children}
            </main>

            <Footer />

            {scrollBtn}
        </>
    )
}

export default Layout
