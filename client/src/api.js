import axios from 'axios';

const api = axios.create({
  // Fallback to production backend — REACT_APP_API_URL overrides this for local dev
  baseURL: process.env.REACT_APP_API_URL || 'https://skillforge-ct63.onrender.com/api',
});

// add token interceptor
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
