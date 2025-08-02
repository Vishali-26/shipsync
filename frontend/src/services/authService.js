import axios from 'axios';

const API_URL = 'http://localhost:8081/api/auth';

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

// Add response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const authService = {
  login: (username, password) => {
    return api.post('/signin', { username, password });
  },

  signup: (userData) => {
    return api.post('/signup', userData);
  },

  getCurrentUser: () => {
    return api.get('/me');
  },

  logout: () => {
    localStorage.removeItem('token');
  }
};

export default authService;
