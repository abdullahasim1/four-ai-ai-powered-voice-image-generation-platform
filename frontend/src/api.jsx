// frontend/src/api.jsx
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "https://four-ai-production.up.railway.app";
const API_BASE_URL = VITE_BACKEND_URL.replace(/\/$/, '') + "/api";

// Debug logging
console.log('🔧 API Configuration:', {
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL,
  defaultUrl: "https://four-ai-production.up.railway.app",
  finalUrl: VITE_BACKEND_URL,
  apiBaseUrl: API_BASE_URL
});

export default API_BASE_URL;