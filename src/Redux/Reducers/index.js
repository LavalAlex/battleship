import { combineReducers } from 'redux'
import playerReducer from './player'
import computerReducer from './computer'

const reducers = combineReducers({
  player: playerReducer,
  computer: computerReducer
})

export default reducers