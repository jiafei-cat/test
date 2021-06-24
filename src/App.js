import react from 'react'
import store from './store'

const { useReducer, useState, useEffect } = react
function App() {
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0)
  const [, setState] = useState(0)
  const home = store.getState()
  console.log(home)
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      console.log('xxxxxxxx')
      setState(state => state + 1)
      // forceUpdate()
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>{home}</p>
        <button onClick={() => store.dispatch({ type: 'add', payload: 1})}>+</button>
        <button onClick={() => store.dispatch({ type: 'minus', payload: 1})}>-</button>
        <button onClick={() => store.dispatch((dispatch, getState) => {
          setTimeout(() => dispatch({ type: 'add', payload: 1}), 1000)
        })}>sync +</button>
      </header>
    </div>
  );
}

export default App;
