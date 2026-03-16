const API_BASE_URL = (import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL.trim()) ? import.meta.env.VITE_API_URL : 'https://palostranka-server.onrender.com';

export default API_BASE_URL;
