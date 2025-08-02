import axios from 'axios';

const API_URL = 'http://localhost:8081/api/products';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const productService = {
  getAllProducts: () => {
    return api.get('/');
  },

  getProductById: (id) => {
    return api.get(`/${id}`);
  },

  getProductsByCategory: (category) => {
    return api.get(`/category/${category}`);
  },

  searchProducts: (name) => {
    return api.get(`/search?name=${name}`);
  },

  getProductsByPriceRange: (minPrice, maxPrice) => {
    return api.get(`/price-range?minPrice=${minPrice}&maxPrice=${maxPrice}`);
  },

  getAllCategories: () => {
    return api.get('/categories');
  },

  createProduct: (productData) => {
    return api.post('/', productData);
  },

  updateProduct: (id, productData) => {
    return api.put(`/${id}`, productData);
  },

  deleteProduct: (id) => {
    return api.delete(`/${id}`);
  },

  toggleProductStatus: (id) => {
    return api.put(`/${id}/toggle-status`);
  },

  updateStock: (id, quantity) => {
    return api.put(`/${id}/stock?quantity=${quantity}`);
  }
};

export default productService;
