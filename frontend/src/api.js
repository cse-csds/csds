import axios from 'axios';

let rawUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// Logic to fix Render's partial URL issue (e.g. 'eduportal-backend-rb47')
if (!rawUrl.includes('localhost') && !rawUrl.includes('.')) {
    rawUrl += '.onrender.com';
}

const API_BASE_URL = rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`;

console.log('Connected to Backend at:', API_BASE_URL);

const api = axios.create({
    baseURL: API_BASE_URL
});

export default api;
export { API_BASE_URL };
