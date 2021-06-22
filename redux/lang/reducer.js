import { EN , MON } from './actionTypes'

const initialState = {
    language: 'mon'
}

export default function(state=initialState , action) {
    switch (action.type) {
        case EN:
            localStorage.setItem('i18nextLng', 'en-Us')
            return {
                ...state,
                language: 'en-Us'
            }

        case MON:
            localStorage.setItem('i18nextLng', 'mon')
            return {
                ...state,
                language: 'mon'
            }
    
        default:
            return state
    }
}