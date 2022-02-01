import { combineReducers } from 'redux'
import { homeReducer } from './home'
import { counterReducer } from './count'

export default combineReducers({
  home: homeReducer,
  counter: counterReducer
})
