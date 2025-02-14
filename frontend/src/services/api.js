// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api', // Asegúrate de que coincida con tu backend
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Agregar interceptor para incluir el usuario_id en todas las peticiones
api.interceptors.request.use(config => {
  const usuario_id = localStorage.getItem('userId');
  if (usuario_id) {
    if (config.method === 'post' || config.method === 'put') {
      config.data = { ...config.data, usuario_id };
    }
  }
  return config;
});

export default api;
