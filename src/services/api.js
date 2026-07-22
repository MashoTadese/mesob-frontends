// ============================================================
// MESOB - API Service (Frontend → Backend)
// ============================================================
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token if available (admin)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('mesob_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── Complaint API ──
export const complaintAPI = {
  submit: (data)       => api.post('/complaints', data),
  getAll: (params)     => api.get('/complaints', { params }),
  getById: (id)        => api.get(`/complaints/${id}`),
  update: (id, data)   => api.put(`/complaints/${id}`, data),
  getStats: ()         => api.get('/complaints/stats'),
};

// ── Contact API ──
export const contactAPI = {
  submit: (data)       => api.post('/contact', data),
  getAll: (params)     => api.get('/contact', { params }),
  markRead: (id)       => api.put(`/contact/${id}/read`),
  delete: (id)         => api.delete(`/contact/${id}`),
};

// ── Content API ──
export const contentAPI = {
  get: ()              => api.get('/content'),
  update: (data)       => api.put('/content', data),
};

// ── Admin API ──
export const adminAPI = {
  login: (data)        => api.post('/admin/login', data),
  register: (data)     => api.post('/admin/register', data),
  getMe: ()            => api.get('/admin/me'),
  getDashboard: ()     => api.get('/admin/dashboard'),
  getAll: ()           => api.get('/admin/all'),
};

export default api;
