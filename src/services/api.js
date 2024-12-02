import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

export const api = {
    getAllProducts: async () => {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    },

    getProductById: async (id) => {
        const response = await axios.get(`${BASE_URL}/products/${id}`);
        return response.data;
    },

    getCategories: async () => {
        const response = await axios.get(`${BASE_URL}/products/categories`);
        return response.data;
    },

    getProductsByCategory: async (category) => {
        const response = await axios.get(`${BASE_URL}/products/category/${category}`);
        return response.data;
    }
};
