import { NextSeo } from 'next-seo'
import React from 'react'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import Layout from '../components/layout/Layout'
import SignUp from '../components/news/SignUp'
import FollowUs from '../components/social/FollowUs'
import { PAGES } from '../config/api'

const PrivacyPolicy = () => {

    const [p , setP] = React.useState(null)
    const { t } = useTranslation()

    React.useEffect(() => {
        axios 
        .get(PAGES + '/140')
        .then(res => {
            setP(res.data)
        }) 
        .catch(err => console.log(err.message))

    }, [])

    const w = typeof window !== 'undefined' ? window.location.href : 'undefined'

    const contentList = (
        <div className="py-5">
            <h4
                className="text-dark text-capitalize mb-4"
                style={{
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                    fontSize: '2rem',
                }}
            >
                {t('a.d', {
                    d_en: p ? p.title.rendered : null,
                    d_mon: p ? p.acf.title_mon : null
                })}
            </h4>
            <p
                className="text-dark mb-0 inside-par-div"
                style={{
                    lineHeight: '1.6em'
                }}
                dangerouslySetInnerHTML={{
                    __html: t('a.d', {
                        d_en: p ? p.content.rendered : null,
                        d_mon: p ? p.acf.content_mon : null
                    })
                }}
            />
        </div>
    )

    return (
        <>
            <NextSeo 
                title={t('site.privacy.policy') + ' - ' + t('site.journal')}
                description="This will be the page meta description"
                canonical={w}
                openGraph={{
                    url: w,
                    title: t('site.privacy.policy') + ' - ' + t('site.journal'),
                    description: 'This will be the page meta description',
                    images: [
                        {
                        url: 'https://www.example.ie/og-image-02.jpg',
                        width: 900,
                        height: 800,
                        alt: t('site.privacy.policy'),
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

export default PrivacyPolicy
