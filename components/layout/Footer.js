import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { ImTwitter } from 'react-icons/im'
import { FaLinkedinIn } from 'react-icons/fa'
import { IoLogoInstagram } from 'react-icons/io5'

const Footer = () => {

    const { t } = useTranslation()

    return (
        <div
            className="bkg-color border-top border-dark"
        >
            <div className="container">
                <div className="row">
                    <div 
                        className="col-12 col-lg-3 py-5 pe-lg-5 text-center text-lg-start"
                    >
                        <h2 className="m-0 text-white">Amartdein</h2>
                        <div className="col-12 col-sm-5 col-md-4 col-lg-12 mx-auto mx-lg-0 px-0 d-flex align-items-center justify-content-around justify-content-lg-between pt-4">
                            <Link href="https://facebook.com">
                                <a 
                                    className="text-decoration-none d-inline-block text-center text-light border border-dark rounded-circle fb-link"
                                    target="_blank"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        lineHeight: '34px'
                                    }}
                                >
                                    <RiFacebookCircleFill size="1.2rem" />
                                </a>
                            </Link>
                            <Link href="https://twitter.com">
                                <a 
                                    className="text-decoration-none d-inline-block text-center text-light border border-dark rounded-circle tw-link"
                                    target="_blank"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        lineHeight: '34px'
                                    }}
                                >
                                    <ImTwitter size="1.2rem" />
                                </a>
                            </Link>
                            <Link href="https://linkedin.com">
                                <a 
                                    className="text-decoration-none d-inline-block text-center text-light border border-dark rounded-circle lk-link"
                                    target="_blank"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        lineHeight: '34px'
                                    }}
                                >
                                    <FaLinkedinIn size="1.2rem" />
                                </a>
                            </Link>
                            <Link href="https://instagram.com">
                                <a 
                                    className="text-decoration-none d-inline-block text-center text-light border border-dark rounded-circle itg-link"
                                    target="_blank"
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        lineHeight: '34px'
                                    }}
                                >
                                    <IoLogoInstagram size="1.2rem" />
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div 
                        className="col-12 col-lg-6 border-start border-dark border-end bd-none py-5 px-lg-5 text-center text-lg-start"
                    >
                        <div className="d-flex align-items-center justify-content-center justify-content-lg-start w-100">
                            <Link href="/privacy-policy">
                                <a 
                                    className="me-5 mb-3 link-hover-underline"
                                    style={{
                                        color: '#fff',
                                        fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {t('site.privacy.policy')}
                                </a>
                            </Link>
                            <Link href="/contact">
                                <a 
                                    className="me-5 mb-3 link-hover-underline"
                                    style={{
                                        color: '#fff',
                                        fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    {t('site.contact')}
                                </a>
                            </Link>
                        </div>
                    </div>
                    <div 
                        className="col-12 col-lg-3 py-5 ps-lg-5 text-center text-lg-start"
                    >
                        <p 
                            className="m-0 text-white-50"
                            style={{
                                fontSize: '0.8rem',
                                fontFamily: "'Inter Regular', 'Mon', sans-serif"
                            }}
                        >
                            Developed by
                            <Link href="/">
                                <a
                                    className="text-white ms-1 link-hover-underline"
                                >
                                    {t('site.journal')}
                                </a>
                            </Link><br />
                            Copyright &copy; {new Date().getFullYear()} . All Rights Reserved 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
