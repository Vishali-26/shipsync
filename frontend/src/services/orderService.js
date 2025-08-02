import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081'}/api/orders`;

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

const orderService = {
  createOrder: (orderData) => {
    return api.post('/', orderData);
  },

  getAllOrders: () => {
    return api.get('/');
  },

  getMyOrders: () => {
    return api.get('/my-orders');
  },

  getOrderById: (id) => {
    return api.get(`/${id}`);
  },

  getOrderByOrderNumber: (orderNumber) => {
    return api.get(`/order-number/${orderNumber}`);
  },

  getOrdersByStatus: (status) => {
    return api.get(`/status/${status}`);
  },

  updateOrderStatus: (id, status) => {
    return api.put(`/${id}/status?status=${status}`);
  },

  cancelOrder: (id) => {
    return api.put(`/${id}/cancel`);
  }
};

export default orderService;
