// V development - localhost:5000
// V production - Render backend URL nastavena v Vercel
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? 'https://palostranka-api.onrender.com' : 'http://localhost:5000');

export default API_BASE_URL;
