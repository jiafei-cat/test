export function createStore(reducer, enhancer) {
  if (Object.prototype.toString.call(enhancer) === '[object Function]') {
    return enhancer(reducer)(createStore)
  }
  let state = {}
  const listenerList = []
  const getState = () => state

  const dispatch = (action) => {
    state = reducer(state, action)
    listenerList.forEach(listener => {
      listener()
    })
  }

  const subscribe = listener => {
    listenerList.push(listener)
    return () => {
      listenerList.splice(listenerList.indexOf(listener), 1)
    }
  }

  dispatch({ type: 'INITIAL_REDUCER'})
  return {
    getState,
    dispatch,
    subscribe,
  }
}


export function combineReducers (objectReducer) {
  return (state, action) => {
    return Object.keys(objectReducer).reduce((obj, reducerKey) => {
      obj[reducerKey] = objectReducer[reducerKey](state[reducerKey], action)
      return obj
    }, {})
  }
}

export function applyMiddleware (...middleware) {
  return reducer => createStore => {
    const { getState, dispatch, ...fns } = createStore(reducer)
    const middlewareApi = {
      getState,
      dispatch,
    }

    const chain = middleware.map(middlewareItem => 
      middlewareItem(middlewareApi)
    )

    const enhancerDispatch = compose(...chain)(dispatch)

    return {
      ...fns,
      getState,
      dispatch: enhancerDispatch,
    }
  }
}

export function compose (...fn) {
  if (!fn.length) {
    return
  }

  if (fn.length === 1) {
    return fn[0]
  }

  return (...arg) => fn.reduce((a, b) => a(b(...arg)))
}