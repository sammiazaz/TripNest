import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

export const tripsAPI = {
  getAll: () => api.get('/trips'),
  getById: (tripId) => api.get(`/trips/${tripId}`),
  create: (tripData) => api.post('/trips', tripData),
  update: (tripId, updates) => api.put(`/trips/${tripId}`, updates),
  delete: (tripId) => api.delete(`/trips/${tripId}`),
  join: (tripId, inviteHash, permission = 'viewer') => 
    api.post(`/trips/${tripId}/join`, { inviteHash, permission }),
  regenerateLink: (tripId) => api.post(`/trips/${tripId}/regenerate-link`),
  getByInviteHash: (hash) => api.get(`/trips/invite/${hash}`),
};

export const logsAPI = {
  getByTrip: (tripId) => api.get(`/logs/trip/${tripId}`),
  create: (tripId, formData) => {
    const token = localStorage.getItem('token');
    return axios.post(`${API_URL}/logs/${tripId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  update: (logId, updates) => api.put(`/logs/${logId}`, updates),
  delete: (logId) => api.delete(`/logs/${logId}`),
};
export const invitationsAPI = {
  getDetails: (inviteHash) => api.get(`/invitations/${inviteHash}`),
  accept: (inviteHash, permission = 'viewer') => 
    api.post(`/invitations/accept/${inviteHash}`, { permission }),
  create: (tripId, options = {}) => 
    api.post(`/invitations/create/${tripId}`, options),
  updatePermission: (tripId, userId, permission) => 
    api.put(`/invitations/${tripId}/participants/${userId}`, { permission }),
  removeParticipant: (tripId, userId) => 
    api.delete(`/invitations/${tripId}/participants/${userId}`),
  leaveTrip: (tripId) => 
    api.post(`/invitations/${tripId}/leave`),
  getAll: (tripId) => 
    api.get(`/invitations/trip/${tripId}/all`),
  regenerate: (tripId) => 
    api.post(`/invitations/${tripId}/regenerate`),
};

export default api;