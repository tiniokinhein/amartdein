import { EN , MON } from './actionTypes'

export const enLang = lang => ({
    type: EN,
    payload: lang
})

export const monLang = lang => ({
    type: MON,
    payload: lang
})