import react from 'react'
import store from './store'
import Count from './count'
const { useReducer, useState, useEffect } = react
function App() {
  const [, forceUpdate] = useReducer(x => x + 1, 0)
  const { home } = store.getState()
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      console.log('App=======')
      forceUpdate()
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className="App">
      {
        home < 6 && (
          <Count />
        )
      }
    </div>
  );
}

export default App;
