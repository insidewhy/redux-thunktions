# redux-thunktions

An FSA/thunk middleware for redux, ideal for use with `redux-actions` and `redux-promise-middleware`.

```javascript
import {createActions} from 'redux-actions'

const {action1, action2, action3, action4} = createActions({
  ACTION_1: data => dispatch => {
    dispatch(action2())

    // the middleware will dispatch action with type ACTION_1 with payload
    // 15 to the reducer
    return 15
  },

  // returns nothing so action with type ACTION_2 is not dispatched
  ACTION_2: () => dispatch => {
    dispatch(action3())
  },

  ACTION_3: () => async (dispatch, getState) => {
    // if using redux-promise-middleware this will dispatch ACTION_3_PENDING
    // and then ACTION_3_FULFILLED (and ACTION_4) or ACTION_3_REJECTED depending on
    // whether the fetch succeeds or not
    const data = await fetch('/api/?type=' + getState().type)
    if (! data.ok)
      throw new Error('bad response from server')

    dispatch(action4())
    return data.json()
  },

  ACTION_4: () => 'plain old action',
})
```

To apply the middleware:

```javascript
import {createStore, applyMiddleware} from 'redux'
import reduxThunktions from 'redux-thunktions'

import {globalReducer} from './reducers'  // you have to supply this

const store = createStore(
  globalReducer,
  applyMiddleware(reduxThunktions)
)
```

If using a promise middleware then `redux-thunktions` should be applied first so that promises returned by the thunk can be intercepted.
