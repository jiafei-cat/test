export default function logger ({ dispatch, getState }) {
  return next => action => {
    const preState = getState()
    console.log('============logger - start============')
    console.log('preState', preState)
    console.log('action', action)
    next(action)
    console.log('state', getState())
    console.log('============logger - end==============')
  }
}