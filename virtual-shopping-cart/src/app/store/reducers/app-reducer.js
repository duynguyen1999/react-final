import { ACTION_INCREMENT_COUNTER } from "../types/app-types"

const initialState = {
  count: 0
}

const appReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_INCREMENT_COUNTER:
      return { ...state, count: state.count + 1 }
    default:
      return state
  }
}

export default appReducer
