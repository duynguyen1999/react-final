import { LOG_IN, LOG_OUT } from "../types/auth-types"

const initialState = {
    id: "",
    isAuth: false,
    phone: "",
    isShop: false,
    isLoadAuthFromLs: true
}

const authReducer = (state = initialState, payload) => {
    switch (payload.type) {
        case LOG_IN:
            //save ls
            localStorage.setItem("user_infomation", JSON.stringify(payload.user));

            return { ...state, isAuth: true, ...payload.user, isLoadAuthFromLs: false }
        case LOG_OUT:
            localStorage.removeItem("user_infomation");

            return { ...state, isAuth: false, id: "", phone: "", isShop: false }
        default:
            return state
    }
}

export default authReducer
