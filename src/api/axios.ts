import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://dummyjson.com'
})

export const getProductPage = async (limit = 20, options = {}) => {
    const response = await api.get(`/products?limit=${limit}`, options)
    return response.data
};

export const getProductBySearch = async (options = {}) => {
    const response = await api.get(`/products/search`, options)
    return response.data
};