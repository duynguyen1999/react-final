import { createStore, applyMiddleware, combineReducers } from "redux"
import thunk from "redux-thunk"

import appReducer from "./reducers/app-reducer"
import authReducer from "./reducers/auth-reducer"

const configureStore = (initialState = {}) => {
  const reducer = combineReducers({
    app: appReducer,
    auth: authReducer
  })

  return createStore(reducer, initialState, applyMiddleware(thunk))
}

export default configureStore
