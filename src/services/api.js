import axios from 'axios';

const BASE_URL = 'https://dummyjson.com';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error);
        if (error.code === 'ECONNABORTED') {
            return Promise.reject(new Error('Request timed out'));
        }
        return Promise.reject(error);
    }
);

export const api = {
    getAllProducts: async () => {
        try {
            const response = await axiosInstance.get('/products');
            return response.data.products;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await axiosInstance.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching product ${id}:`, error);
            throw error;
        }
    },

    getCategories: async () => {
        try {
            const response = await axiosInstance.get('/products/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            throw error;
        }
    },

    getProductsByCategory: async (category) => {
        try {
            const response = await axiosInstance.get(`/products/category/${category}`);
            return response.data.products;
        } catch (error) {
            console.error(`Error fetching products in category ${category}:`, error);
            throw error;
        }
    }
};

export default api;
