import { sendPostRequest, sendGetRequest } from "./base.api"


//post create new cart 
export const postCreateCart = async (customerId, shopId) => {
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

export const getCartByCartID = async (cartId) => {
 return await  sendGetRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Cart/${cartId}`);
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

export const postOrder = async data => {
  return await sendPostRequest(
    `${process.env.REACT_APP_API_ENDPOINT}/api/Order`,
    JSON.stringify(data),
    { "Content-Type": "application/json" }
  )
}
