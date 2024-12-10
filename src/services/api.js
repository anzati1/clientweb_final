import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

export const api = {
    getAllProducts: async (skip = 0, limit = 20) => {
        try {
            const response = await axiosInstance.get(`/products?skip=${skip}&limit=${limit}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    searchProducts: async (query) => {
        try {
            const response = await axiosInstance.get(`/products/search?q=${query}`);
            return response.data;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    },

    getProductsByCategory: async (category) => {
        try {
            const response = await axiosInstance.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching category products:', error);
            throw error;
        }
    },

    getAllCategories: async () => {
        try {
            const response = await axiosInstance.get('/products/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await axiosInstance.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    }
};

export default api;
