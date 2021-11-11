import { sendPostRequest } from "./base.api"

export const createNewCart = async (customerId, shopId) => {
  return await sendPostRequest(
    `${process.env.REACT_APP_API_ENDPOINT}/api/Cart/create`,
    JSON.stringify({ customerId, shopId }),
    { "Content-Type": "application/json" }
  )
}

export const getCurrentShopCart = async (customerId, shopId) => {
  return await sendPostRequest(
    `${process.env.REACT_APP_API_ENDPOINT}/api/Cart/exist/shop/customer`,
    JSON.stringify({ customerId, shopId }),
    { "Content-Type": "application/json" }
  )
}

export const addCartItem = async data => {
  return await sendPostRequest(
    `${process.env.REACT_APP_API_ENDPOINT}/api/Cart/add/item`,
    JSON.stringify(data),
    { "Content-Type": "application/json" }
  )
}

export const removeCartItem = async data => {
  return await sendPostRequest(
    `${process.env.REACT_APP_API_ENDPOINT}/api/Cart/remove/item`,
    JSON.stringify(data),
    { "Content-Type": "application/json" }
  )
}

export const submitCart = async data => {
  return await sendPostRequest(
    `${process.env.REACT_APP_API_ENDPOINT}/api/Cart/submit`,
    JSON.stringify(data),
    { "Content-Type": "application/json" }
  )
}

export const placeOrder = async data => {
  return await sendPostRequest(
    `${process.env.REACT_APP_API_ENDPOINT}/api/Order`,
    JSON.stringify(data),
    { "Content-Type": "application/json" }
  )
}
