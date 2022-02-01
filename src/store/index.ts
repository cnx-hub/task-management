import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
// import {Re} from "redux"
import ThunkMiddleware from 'redux-thunk'

import reducers from './reducer'
// 是我们能够通过调试工具看到redux状态的变化
const enhaner = composeWithDevTools(applyMiddleware(ThunkMiddleware))

const store = createStore(reducers, enhaner)

export type rootState = ReturnType<typeof reducers>
export default store
