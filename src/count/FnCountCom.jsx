import { useSelector, useDispatch, useStore } from '../store/react-redux'
export default function FnCountCom() {
  const foo = useSelector(state => state.foo)
  const home = useSelector(state => state.home)
  const dispatch = useDispatch()
  const store = useStore()
  return (
    <section>
      <h4>Function Component - React-redux: (useSelector, useDispatch, useStore)</h4>
      <p>home: {home} foo: {foo}</p>
      <p>store home: {store.getState().home}</p>
      <button onClick={() => dispatch({ type: 'add', payload: 1})}>+</button>
      <button onClick={() => dispatch({ type: '--', payload: 1})}>-</button>
      <button onClick={() => dispatch((dispatch, getState) => {
        setTimeout(() => dispatch({ type: 'add', payload: 1}), 1000)
      })}>sync +</button>
    </section>
  )
}