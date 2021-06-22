import Link from 'next/link'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { RiFacebookCircleFill } from 'react-icons/ri'
import { ImTwitter } from 'react-icons/im'
import { AiOutlineLinkedin } from 'react-icons/ai'
import { IoLogoInstagram } from 'react-icons/io5'

const SideFollowUs = () => {

    const { t } = useTranslation()

    return (
        <div className="mt-2 pb-3 mb-5">
            <h4 
                className="mb-2 text-dark"
                style={{
                    fontSize: '1rem',
                    fontFamily: "'Inter ExtraBold', 'Mon', sans-serif"
                }}
            >
                {t('site.follow.us')}
            </h4>
            <div className="d-flex align-items-center justify-content-around pt-2">
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

export default SideFollowUs
