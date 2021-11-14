import { ACTION_INCREMENT_COUNTER } from "../types/app-types"

export const incrementCounter = () => dispatch => {
  dispatch({
    type: ACTION_INCREMENT_COUNTER,
  })
}