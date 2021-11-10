import { sendGetRequest, sendPostRequest, sendPutRequest ,sendDeleteRequest} from "./base.api";

export const login = async (phoneNumber, isShop = true) => {
    const url = `${process.env.REACT_APP_API_ENDPOINT}/api/${isShop ? "Shop" : "Customer"}/login`;

    return await sendPostRequest(url, JSON.stringify({ phoneNumber }), { 'Content-Type': 'application/json' });
}

export const registerShop = async (formData) => {
    return await sendPostRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Shop/register`, formData);
}

export const getShops = async () => {
    return await sendGetRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Shop/all`);
}

export const getShopsDetail = async (id) => {
    return await sendGetRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Shop/${id}`);
}

export const addShopItem = async (formData) => {
    return await sendPostRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Item/create`, formData);
};

export const updateShopItem = async (formData) => {
    return await sendPutRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Item`, formData);
};

export const updateShopInfo = async (formData) => {
    return await sendPutRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Shop`, formData);
};

export const deleteShopItem = async (data) => {
    return await sendDeleteRequest(`${process.env.REACT_APP_API_ENDPOINT}/api/Item`,  JSON.stringify(data), {'Content-Type': 'application/json-patch+json'} );
};