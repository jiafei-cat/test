import react from 'react'
import store from '../store'
const { useReducer, useState, useEffect } = react
export default function Count () {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const { home } = store.getState()
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      forceUpdate()
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <header className="App-header">
      <p>{home}</p>
      <button onClick={() => store.dispatch({ type: 'add', payload: 1})}>+</button>
      <button onClick={() => store.dispatch({ type: '--', payload: 1})}>-</button>
      <button onClick={() => store.dispatch((dispatch, getState) => {
        console.log(dispatch)
        setTimeout(() => dispatch({ type: 'add', payload: 1}), 1000)
      })}>sync +</button>
    </header>
  )
}