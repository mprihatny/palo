// V development - localhost:5000
// V production - same domain (WebSupport)
const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

export default API_BASE_URL;
