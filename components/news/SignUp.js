import React from 'react'
import axios from 'axios'
import { useTranslation } from 'react-i18next'
import { IoIosArrowForward } from 'react-icons/io'
import { SUBSCRIBERS } from '../../config/api'
import { IoClose } from 'react-icons/io5'


const key = 'amartdeinjournaldfdfdf456789'
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYW1hcnQuamFuYW1vbi5jbyIsImlhdCI6MTYxNjQwOTQ3OCwibmJmIjoxNjE2NDA5NDc4LCJleHAiOjE2MTcwMTQyNzgsImRhdGEiOnsidXNlciI6eyJpZCI6MX19fQ.5jKniCS6VZn2gFTSw_ikdN9HUDEOoPm7KpFfPDzU7pI'

const SignUp = () => {

    const [name , setName] = React.useState('')
    const [email , setEmail] = React.useState('')
    const [mailSent , setMailSent] = React.useState(false)
    const [error , setError] = React.useState(null)
    const { t } = useTranslation()

    const handleOnSubscribe = e => {
        e.preventDefault()

        axios({
            method: 'POST',
            url: SUBSCRIBERS,
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            data: JSON.stringify({
                "email": email,
                "name": name,
                "api_key": key
            })
        })
        .then(result => {
            setMailSent(true)
        })
        .catch(err => {
            setError(err.message)
        })
    }

    const formList = (
        <form 
            autoComplete="off"
            onSubmit={handleOnSubscribe}
            className="px-3"
        >
            <div className="row">
                <div className="col-12 col-md-4 border-end bg-white py-md-3 mb-3 mb-md-0 px-0 px-md-3">
                    <input 
                        type="text"
                        name="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        className="form-control border-0 rounded-0 shadow-none text-dark bg-transparent"
                        placeholder={t('site.enter.name')}
                        style={{
                            fontSize: '0.9rem',
                            height: '40px',
                            fontFamily: "'Inter Regular', 'Mon', sans-serif"
                        }}
                        required
                    />
                </div>
                <div className="col-12 col-md-4 bg-white py-md-3 mb-3 mb-md-0 px-0 px-md-3">
                    <input 
                        type="email"
                        name="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="form-control border-0 rounded-0 shadow-none text-dark bg-transparent"
                        placeholder={t('site.enter.email')}
                        style={{
                            fontSize: '0.9rem',
                            height: '40px',
                            fontFamily: "'Inter Regular', 'Mon', sans-serif"
                        }}
                        required
                    />
                </div>
                <div className="col-12 col-md-4 bg-white py-md-3 d-flex px-0 px-md-3">
                    <button 
                        type="submit"
                        className="btn px-4 py-3 py-md-1 border-0 rounded-0 shadow-none w-100"
                        style={{
                            fontSize: '0.8rem',
                            background: '#333',
                            color: '#fff',
                            fontFamily: "'Inter SemiBold', 'Mon', sans-serif"
                        }}
                    >
                        {t('site.subscribe')} <IoIosArrowForward size="0.8rem" />
                    </button>
                </div>
            </div>

            {
                error ? (
                    <div
                        className="position-fixed"
                        style={{
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 999999,
                            background: 'rgba(0,0,0,0.5)'
                        }}
                        onClick={() => {
                            setName('')
                            setEmail('')
                            setError(null)
                            setMailSent(false)
                        }}
                    >
                        <div 
                            className="position-absolute bg-danger p-5 shadow-lg rounded-3"
                            style={{
                                left: '50%',
                                top: '50%',
                                transform: 'translate3d(-50%,-50%,0)'
                            }}
                        >
                            <p 
                                className="mb-0"
                                style={{
                                    color: '#fff'
                                }}
                            >
                                You have error to subscribe
                            </p>

                            <button
                                className="btn text-center rounded-circle shadow-none p-0 border-0 position-absolute"
                                style={{
                                    right: '-15px',
                                    top: '-15px',
                                    width: '30px',
                                    height: '30px',
                                    background: '#fff',
                                    lineHeight: 0
                                }}
                                onClick={() => {
                                    setName('')
                                    setEmail('')
                                    setError(null)
                                    setMailSent(false)
                                }}
                            >
                                <IoClose color="#000" size="1.2rem" />
                            </button>
                        </div>
                    </div>
                ) : (
                    mailSent ? (
                        <div
                            className="position-fixed"
                            style={{
                                left: 0,
                                top: 0,
                                right: 0,
                                bottom: 0,
                                zIndex: 999999,
                                background: 'rgba(0,0,0,0.5)'
                            }}
                            onClick={() => {
                                setName('')
                                setEmail('')
                                setError(null)
                                setMailSent(false)
                            }}
                        >
                            <div 
                                className="position-absolute bg-white p-5 shadow-lg rounded-3"
                                style={{
                                    left: '50%',
                                    top: '50%',
                                    transform: 'translate3d(-50%,-50%,0)'
                                }}
                            >
                                <p 
                                    className="mb-0"
                                    style={{
                                        color: '#000'
                                    }}
                                >
                                    You have subscribed successfully
                                </p>

                                <button
                                    className="btn text-center rounded-circle shadow-none p-0 border-0 position-absolute"
                                    style={{
                                        right: '-15px',
                                        top: '-15px',
                                        width: '30px',
                                        height: '30px',
                                        background: '#000',
                                        lineHeight: 0
                                    }}
                                    onClick={() => {
                                        setName('')
                                        setEmail('')
                                        setError(null)
                                        setMailSent(false)
                                    }}
                                >
                                    <IoClose color="#fff" size="1.2rem" />
                                </button>
                            </div>
                        </div>
                    ) : null
                )
            }

        </form>
    )

    return (
        <div
            className="bkg-color"
            style={{
                padding: '5rem 0'
            }}
        >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-lg-5 mb-3 mb-lg-0 text-center text-lg-start">
                        <h4
                            className="mb-2"
                            style={{
                                fontFamily: "'Inter ExtraBold', 'Mon', sans-serif",
                                fontSize: '1.7rem',
                                lineHeight: '1.6em',
                                color: '#fff'
                            }}
                        >
                            Sign Up for Our Newsletters
                        </h4>
                        <p 
                            className="m-0 text-white-50"
                            style={{
                                fontSize: '0.9rem'
                            }}
                        >
                            Get notified of the update news.
                        </p>
                    </div>
                    <div className="col-12 col-lg-7">
                        {formList}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SignUp
