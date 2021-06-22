import { createStore , applyMiddleware } from 'redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import Reducers from './reducers'

const middleware = applyMiddleware(thunk , logger)

const store = createStore(Reducers, middleware)
const persistor = persistStore(store)

export {
    store,
    persistor
}