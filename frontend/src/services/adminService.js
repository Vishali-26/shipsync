import axios from 'axios';

const API_URL = 'http://localhost:8081/api/admin';

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

const adminService = {
  getAllUsers: () => {
    return api.get('/users');
  },

  getAllCustomers: () => {
    return api.get('/users/customers');
  },

  toggleUserStatus: (id) => {
    return api.put(`/users/${id}/toggle-status`);
  },

  getAllProducts: () => {
    return api.get('/products/all');
  },

  getLowStockProducts: (threshold = 10) => {
    return api.get(`/products/low-stock?threshold=${threshold}`);
  },

  getDashboardStats: () => {
    return api.get('/dashboard/stats');
  },

  getRevenue: (startDate, endDate) => {
    let url = '/revenue';
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    if (params.toString()) url += `?${params.toString()}`;
    
    return api.get(url);
  }
};

export default adminService;
