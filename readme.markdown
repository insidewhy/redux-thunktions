# redux-thunktions

An FSA/thunk middleware for redux, ideal for use with `redux-actions` and `redux-promise-middleware`.

```javascript
import { createActions } from 'redux-actions'

const actions = createActions({
  ACTION_1: data => dispatch => {
    dispatch(actions.ACTION_2())

    // the middleware will dispatch action with type ACTION_1 with payload
    // 15 to the reducer
    return 15
  },

  // returns nothing so action with type ACTION_2 is not dispatched
  ACTION_2: () => dispatch => {
    dispatch(actions.ACTION_3())
  },

  ACTION_3: () => async (dispatch, getState) => {
    // if using redux-promise-middleware this will dispatch ACTION_3_PENDING
    // and then ACTION_3_FULFILLED (and ACTION_4) or ACTION_3_REJECTED depending on
    // whether the fetch succeeds or not
    const data = await fetch('/api/?type=' + getState().type)
    if (! data.ok)
      throw new Error('bad response from server')

    dispatch(actions.ACTION_4())
    return data.json()
  },

  ACTION_4: () => 'plain old action',
})
```
