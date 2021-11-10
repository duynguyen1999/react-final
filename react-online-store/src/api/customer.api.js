import { sendPostRequest , sendGetRequest } from "./base.api";

export const registerCustomer = async (formData) => {
    return await sendPostRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Customer/register`, formData);
}

export const getOrderByCustomerId = async (customerId) => {
    return await sendGetRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Order/${customerId}/customer/all`);
}