import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

const allowedLanguages = ['en-Us', 'mon']

const defaultLanguage = 'mon'
let lng = defaultLanguage

const storageLanguage = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : 'undefined'

if(storageLanguage && allowedLanguages.indexOf(storageLanguage) > -1) {
     lng = storageLanguage
}

i18n 
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    lng,
    debug: false,
    keySeparator: false,
    interpolation: {
        escapeValue: false
    },
    backend: {
        allowMultiLoading: false,
        loadPath: '/locales/{{lng}}.json'
    },
    react: {
        useSuspense: false
    }
})

const language = i18n

export default language
