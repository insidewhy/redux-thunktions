export default ({ dispatch, getState }) => next => action => {
  if (! action)
    return next(action)

  const {payload} = action
  if (typeof payload !== 'function')
    return next(action)

  const thunkedPayload = payload(dispatch, getState)
  if (typeof thunkedPayload !== 'undefined') {
    const {type, error} = action
    next({ type, error, payload: thunkedPayload })
  }
}
