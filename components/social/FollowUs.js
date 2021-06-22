import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { ImTwitter } from 'react-icons/im'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { IoLogoInstagram } from 'react-icons/io5'

const FollowUs = () => {

    const { t } = useTranslation()

    return (
        <div className="pb-5 mb-5">
            <h4 
                className="mb-3 pb-3 text-dark"
                style={{
                    fontSize: '1.2rem',
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                    borderBottom: '4px solid #e9ecef'
                }}
            >
                {t('site.follow.us')}
            </h4>
            <div className="col-12 col-sm-9 col-md-6 col-lg-12 px-0 d-flex align-items-center justify-content-around pt-2">
                <Link href="https://facebook.com">
                    <a 
                        className="text-decoration-none text-dark fb-link"
                        target="_blank"
                    >
                        <RiFacebookCircleFill size="1.5rem" />
                    </a>
                </Link>
                <Link href="https://twitter.com">
                    <a 
                        className="text-decoration-none text-dark tw-link"
                        target="_blank"
                    >
                        <ImTwitter size="1.5rem" />
                    </a>
                </Link>
                <Link href="https://linkedin.com">
                    <a 
                        className="text-decoration-none text-dark lk-link"
                        target="_blank"
                    >
                        <AiOutlineLinkedin size="1.5rem" />
                    </a>
                </Link>
                <Link href="https://instagram.com">
                    <a 
                        className="text-decoration-none text-dark itg-link"
                        target="_blank"
                    >
                        <IoLogoInstagram size="1.5rem" />
                    </a>
                </Link>
            </div>
        </div>
    )
}

export default FollowUs
