import { sendGetRequest, sendPutRequest } from "./base.api";

export const getShopOrders = async (shopId) => {
    return await sendGetRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Order/${shopId}/shop/all`);
}

export const updateOrderStatus = async (data) => {
    return await sendPutRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Order/status`, JSON.stringify(data), { 'Content-Type': 'application/json' });
}