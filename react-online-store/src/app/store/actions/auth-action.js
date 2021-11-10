import { LOG_IN, LOG_OUT } from "../types/auth-types"

export const logIn = (user) => dispatch => {
    dispatch({
        type: LOG_IN,
        user
    })
}

export const logOut = () => dispatch => {
    dispatch({
        type: LOG_OUT
    })
}