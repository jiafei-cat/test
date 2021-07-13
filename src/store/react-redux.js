import React from 'react'
const { useContext, useLayoutEffect, useReducer } = React

const ReactReduxContext = React.createContext()
ReactReduxContext.displayName = 'ReactRedux'

export function Provider ({
  children,
  ...props
}) {
  return <ReactReduxContext.Provider value={{...props}}>{children}</ReactReduxContext.Provider>
}

function bindActionCreators(mapDispatchToProps, dispatch) {
  return Object.keys(mapDispatchToProps).reduce((obj, cur) => ((obj[cur] = (...arg) => dispatch(mapDispatchToProps[cur](...arg))) && obj), {})
}

export const connect = function (mapStateToProps, mapDispatchToProps) {
  return WrapperComponent => function WrapperComponentFn (props) {
    const { store } = useContext(ReactReduxContext)
    const [, forceUpdate] = useReducer(x => x + 1, 0)

    WrapperComponent.displayName = `Connect(${WrapperComponent.name})`
    WrapperComponentFn.displayName = `ConnectWrapper`

    const stateProps = mapStateToProps(store.getState())

    let dispatchProps = {}

    if (typeof mapDispatchToProps === 'object') {
      dispatchProps = bindActionCreators(mapDispatchToProps, store.dispatch)
    } else if (typeof mapDispatchToProps === 'function') {
      dispatchProps = mapDispatchToProps(store.dispatch)
    } else {
      throw new Error('mapDispatchToProps must be object or function')
    }

    useLayoutEffect(() => {
      let unSubscribe = store.subscribe(() => {
        console.log(mapStateToProps(store.getState()))
        forceUpdate()
      })

      return () => {
        unSubscribe()
      }
    }, [store])

    let WrapperComponentMemo = React.memo(WrapperComponent)
    return (
      <WrapperComponentMemo {...props} {...stateProps} {...dispatchProps}></WrapperComponentMemo>
    )
  }
}

export function useSelector (selector) {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const { store } = useContext(ReactReduxContext)

  useLayoutEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate()
    })

    return () => {
      unsubscribe()
    }
  }, [store])
  return selector(store.getState())
}

export function useDispatch () {
  const { store } = useContext(ReactReduxContext)
  return store.dispatch
}

export function useStore () {
  const { store } = useContext(ReactReduxContext)
  return store
}