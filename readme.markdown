# redux-thunktions

An FSA/thunk middleware for redux, ideal for use with `redux-actions` and `redux-promise-middleware`.

```javascript
import { createActions } from 'redux-actions'

const actions = createActions({
  ACTION_1: data => dispatch => {
    dispatch(ACTION_2)

    // dispatch action with type ACTION_1 with payload 15
    return 15
  },

  // returns undefined so action with type ACTION_2 is not dispatched
  ACTION_2: () => dispatch => {
    dispatch(ACTION_3)
  },

  ACTION_3: () => async (dispatch, getState) => {
    // if using redux-promise-middleware this will dispatch ACTION_3_PENDING
    // and then ACTION_3_FULFILLED or ACTION_3_REJECTED depending on whether
    // the fetch succeeds or not
    const data = await fetch('/api/?type=' + getState().type)
    if (! data.ok)
      throw new Error('bad response from server')
    else
      return data.json()
  },
})
```
