export default function logger ({ dispatch, getState }) {
  return next => action => {
    console.log(next)
    const preState = getState()
    console.log('preState', preState)
    console.log('action', action)
    next(action)
    console.log('state', getState())
  }
}