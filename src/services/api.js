import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com';

// Create axios instance with default config
const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000 // 10 seconds timeout
});

// Add response interceptor for error handling
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
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            // Return mock data if API fails
            return mockProducts;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await axiosInstance.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            // Return mock product if API fails
            return mockProducts.find(p => p.id === parseInt(id)) || null;
        }
    },

    getCategories: async () => {
        try {
            const response = await axiosInstance.get('/products/categories');
            return response.data;
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Return mock categories if API fails
            return ['electronics', 'jewelery', "men's clothing", "women's clothing"];
        }
    },

    getProductsByCategory: async (category) => {
        try {
            const response = await axiosInstance.get(`/products/category/${category}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching products by category:', error);
            // Return mock products by category if API fails
            return mockProducts.filter(p => p.category === category);
        }
    }
};

// Mock data for fallback
const mockProducts = [
    {
        id: 1,
        title: "Fjallraven - Foldsack No. 1 Backpack",
        price: 109.95,
        description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: { rate: 3.9, count: 120 }
    },
    {
        id: 2,
        title: "Mens Casual Premium Slim Fit T-Shirts",
        price: 22.3,
        description: "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
        category: "men's clothing",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
        rating: { rate: 4.1, count: 259 }
    },
    // Add more mock products as needed
];

export default api;
