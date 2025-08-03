// frontend/src/api.jsx
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_BASE_URL = VITE_BACKEND_URL ? VITE_BACKEND_URL.replace(/\/$/, '') + "/api" : null;

// Hugging Face API Key
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

// Validate required environment variables
if (!VITE_BACKEND_URL) {
  console.error('❌ VITE_BACKEND_URL is not set in environment variables');
}

if (!HUGGING_FACE_API_KEY) {
  console.error('❌ VITE_HUGGING_FACE_API_KEY is not set in environment variables');
}

// Debug logging (only in development)
if (import.meta.env.DEV) {
  console.log('🔧 API Configuration:', {
    VITE_BACKEND_URL: VITE_BACKEND_URL ? '✅ set' : '❌ missing',
    apiBaseUrl: API_BASE_URL ? '✅ set' : '❌ missing',
    huggingFaceApiKey: HUGGING_FACE_API_KEY ? '✅ set' : '❌ missing'
  });
}

export default API_BASE_URL;
export { HUGGING_FACE_API_KEY };