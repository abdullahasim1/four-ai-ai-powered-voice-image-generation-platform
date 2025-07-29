// frontend/src/api.jsx
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://four-ai-9eat.vercel.app";
const API_BASE_URL = VITE_BACKEND_URL.replace(/\/$/, '') + "/api";
export default API_BASE_URL;