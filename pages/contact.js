import { NextSeo } from 'next-seo'
import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import Layout from '../components/layout/Layout'
import LatestNews from '../components/news/LatestNews'
import MostViewedNews from '../components/news/MostView'
import SignUp from '../components/news/SignUp'
import FollowUs from '../components/social/FollowUs'
import Topics from '../components/category/Topics'


const formURL = '/form/contact.php'

const Contact = () => {

    const { t } = useTranslation()
    const [state , setState] = React.useState({
        name: '',
        email: '',
        message: '',
        error: null,
        mailSent: false
    })

    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const handleChange = e => {
        setState(value => {
            return {
                ...value,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = e => {
        e.preventDefault()

        axios({
            method: 'POST',
            url: formURL,
            headers: {
                'content-type': 'application/json'
            },
            data: state
        })
        .then(result => {
            setState(value => {
                return {
                    ...value,
                    mailSent: result.data.sent
                }
            })
        })
        .catch(err => {
            setState(value => {
                return {
                    ...value,
                    error: err.message
                }
            })
        })
    }

    const contentList = (
        <div className="py-5">
            <h4
                className="text-dark text-capitalize mb-5"
                style={{
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                    fontSize: '2rem',
                }}
            >
                {t('site.contact')}
            </h4>
            
            <form 
                autoComplete="off"
                onSubmit={handleSubmit}
            >
                <div className="row mx-lg-n4">
                    <div className="col-12 col-lg-6 px-lg-4">
                        <div className="form-group mb-4">
                            <label 
                                htmlFor="name"
                                className="form-label mb-2 text-dark"
                                style={{
                                    fontFamily: "'Inter Regular', 'Mon', sans-serif",
                                    fontSize: '0.8rem'
                                }}
                            >
                                {t('site.name.required')}
                            </label>
                            <input 
                                type="text"
                                name="name"
                                id="name"
                                value={state.name}
                                onChange={handleChange}
                                className="form-control bg-transparent border rounded-0 shadow-none px-4 py-3 text-dark"
                                style={{
                                    height: '50px',
                                    fontFamily: "'Inter Bold', 'Mon', sans-serif"
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div className="col-12 col-lg-6 px-lg-4">
                        <div className="form-group mb-4">
                            <label 
                                htmlFor="email"
                                className="form-label mb-2 text-dark"
                                style={{
                                    fontFamily: "'Inter Regular', 'Mon', sans-serif",
                                    fontSize: '0.8rem'
                                }}
                            >
                                {t('site.email.required')}
                            </label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                value={state.email}
                                onChange={handleChange}
                                className="form-control bg-transparent border rounded-0 shadow-none px-4 py-3 text-dark"
                                style={{
                                    height: '50px'
                                }}
                                required
                            />
                        </div>
                    </div>

                    <div className="col-12 px-lg-4">
                        <div className="form-group mb-4">
                            <label 
                                htmlFor="message"
                                className="form-label mb-2 text-dark"
                                style={{
                                    fontFamily: "'Inter Regular', 'Mon', sans-serif",
                                    fontSize: '0.8rem'
                                }}
                            >
                                {t('site.message.required')}
                            </label>
                            <textarea
                                rows="5"
                                name="message"
                                id="message"
                                value={state.message}
                                onChange={handleChange}
                                className="form-control bg-transparent border rounded-0 shadow-none px-4 py-3 text-dark"
                                style={{
                                    resize: 'none',
                                    fontFamily: "'Inter Bold', 'Mon', sans-serif"
                                }}
                                required
                            />
                        </div>
                    </div>

                    {
                        state.error ? (
                            <>
                                <div className="col-12 px-lg-4">
                                    <div className="form-group mb-4">
                                        <p 
                                            className="mb-0 text-danger"
                                            style={{
                                                fontSize: '0.8rem',
                                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif"
                                            }}
                                        >
                                            Your message has not been sent, reset it and try again
                                        </p>
                                    </div>
                                </div>

                                <div className="col-12 px-lg-4">
                                    <div className="form-group">
                                        <button 
                                            className="btn border-0 rounded-0 shadow-none px-5 py-2 btn-load-more"
                                            style={{
                                                fontSize: '0.9rem',
                                                fontFamily: "'Inter SemiBold', 'Mon', sans-serif"
                                            }}
                                            onClick={() => setState({
                                                name: '',
                                                email: '',
                                                message: '',
                                                error: null,
                                                mailSent: false
                                            })}
                                        >
                                            {t('site.contact.reset')}
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            state.mailSent ? (
                                <>
                                    <div className="col-12 px-lg-4">
                                        <div className="form-group mb-4">
                                            <p 
                                                className="mb-0 text-success"
                                                style={{
                                                    fontSize: '0.8rem',
                                                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif"
                                                }}
                                            >
                                                Your message has been sent successfully
                                            </p>
                                        </div>
                                    </div>

                                    <div className="col-12 px-lg-4">
                                        <div className="form-group">
                                            <button 
                                                className="btn border-0 rounded-0 shadow-none px-5 py-2 btn-load-more"
                                                style={{
                                                    fontSize: '0.9rem',
                                                    fontFamily: "'Inter SemiBold', 'Mon', sans-serif"
                                                }}
                                                onClick={() => setState({
                                                    name: '',
                                                    email: '',
                                                    message: '',
                                                    error: null,
                                                    mailSent: false
                                                })}
                                            >
                                                {t('site.contact.reset')}
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="col-12 px-lg-4">
                                    <div className="form-group">
                                        <button 
                                            type="submit"
                                            className="btn border-0 rounded-0 shadow-none px-5 py-2 btn-load-more"
                                            style={{
                                                fontSize: '0.9rem',
                                                fontFamily: "'Inter SemiBold', 'Mon', sans-serif"
                                            }}
                                        >
                                            {t('site.contact.submit')}
                                        </button>
                                    </div>
                                </div>
                            )
                        )
                    }
                 
                </div>
            </form>
        </div>
    )

    return (
        <>
            <NextSeo 
                title={t('site.contact') + ' - ' + t('site.journal')}
                description="This will be the page meta description"
                canonical={w}
                openGraph={{
                    url: w,
                    title: t('site.contact') + ' - ' + t('site.journal'),
                    description: 'This will be the page meta description',
                    images: [
                        {
                        url: 'https://www.example.ie/og-image-02.jpg',
                        width: 900,
                        height: 800,
                        alt: t('site.contact'),
                        }
                    ],
                }}
            />

            <Layout>
                <div className="py-5 bg-theme">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-lg-8 pe-3 pe-lg-5">
                                {contentList}
                            </div>
                            <div className="col-12 col-lg-4">
                                <div 
                                    className="py-5"
                                >
                                    <FollowUs />
                                    <MostViewedNews />
                                    <LatestNews />
                                    <Topics />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SignUp />
            </Layout>

        </>
    )
}

export default Contact
