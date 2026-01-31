import axios from 'axios';

const rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const API_BASE_URL = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;

const api = axios.create({
    baseURL: API_BASE_URL
});

export default api;
export { API_BASE_URL };
