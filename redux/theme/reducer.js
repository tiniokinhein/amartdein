import { LIGHT , DARK } from './actionTypes'

const initialState = {
    theme: 'light'
}

export default function(state=initialState, action) {
    switch (action.type) {
        case LIGHT:
            document.documentElement.className = 'light'
            // document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000')
            return {
                ...state,
                theme: 'light'
            }

        case DARK:
            document.documentElement.className = 'dark'
            // document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000')
            return {
                ...state,
                theme: 'dark'
            }
    
        default:
            return state
    }
}