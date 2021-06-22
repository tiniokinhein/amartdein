import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import themeReducer from './theme/reducer'
import languageReducer from './lang/reducer'

const themePersistConfig = {
    key: 'theme',
    storage
}

const languagePersistConfig = {
    key: 'lang',
    storage
}

const Reducers = combineReducers({
    theme: persistReducer(themePersistConfig, themeReducer),
    language: persistReducer(languagePersistConfig, languageReducer)
})

export default Reducers