import { createStore, applyMiddleware, combineReducers } from './redux'
import thunk from './redux-thunk';
import logger from './redux-logger';

function countReducer (state = 0, action) {
  switch (action.type) {
    case 'add':
      return state + action.payload
    case 'minus':
      return state - action.payload
    default:
      return 0
  }
}
  
function countReducerTow (state = 0, action) {
  switch (action.type) {
    case '++':
      return state + action.payload
    case '--':
      return state - action.payload
    default:
      return 1
  }
}

const store = createStore(combineReducers({home: countReducer, foo: countReducerTow}), applyMiddleware(logger, thunk))

export default store