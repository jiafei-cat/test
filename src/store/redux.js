export function createStore (reducer) {
  const currentListener = []
  let state = null

  const getState = () => state

  const subscribe = listener => {
    currentListener.push(listener)

    return () => {
      currentListener.splice(currentListener.indexOf(listener), 1)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    currentListener.forEach(listener => {
      listener()
    })
  }


  dispatch({ type: 'REDUX_INITIAL' })
  return {
    getState,
    subscribe,
    dispatch,
  }
}


export function combineReducers (reducerObj) {
  return function combination (state = {}, action) {
    Object.keys(reducerObj).forEach(key => {
      state[key] = reducerObj[key](state[key], action)
    })

    return state
  }
}


export function applyMiddleware (middleware) {

}


function compose(...fns) {
  if (!fns.length) {
    return
  }
  if (fns.length === 1) {
    return fns
  }
  return (...arg) => fns.reduce((pre, fn) => fn(pre(...arg)))
}