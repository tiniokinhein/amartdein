import { LIGHT , DARK } from './actionTypes'

export const lightTheme = theme => ({
    type: LIGHT,
    payload: theme
})

export const darkTheme = theme => ({
    type: DARK,
    payload: theme
})