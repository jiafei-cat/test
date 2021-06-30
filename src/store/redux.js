export function createStore(reducer) {
  let state = null
  const listenerList = []
  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    console.log(state)
    listenerList.forEach(listener => {
      listener()
    })
  }

  const subscribe = listener => {
    listenerList.push(listener)
    return () => {
      listenerList.splice(listenerList.indexOf(listener), 1)
      console.log(listenerList)
    }
  }

  dispatch({ type: 'INITIAL_REDUCER'})
  // dispatch({ type: 'add', payload: 1})
  return {
    getState,
    dispatch,
    subscribe,
  }
}


export function combineReducers (objectReducer) {
  return (state, action) => {
    return Object.keys(objectReducer).reduce((obj, reducerKey) => {
      obj[reducerKey] = objectReducer[reducerKey](state, action)
      return obj
    }, {})
  }
}