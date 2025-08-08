// frontend/src/api.jsx
const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const API_BASE_URL = VITE_BACKEND_URL ? VITE_BACKEND_URL.replace(/\/$/, '') + "/api" : null;

// Hugging Face API Configuration
const HUGGING_FACE_API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

// Available models with fallbacks - Updated with working models
const IMAGE_MODELS = {
  primary: "stabilityai/stable-diffusion-2-1",
  fallback1: "stabilityai/stable-diffusion-2-base",
  fallback2: "runwayml/stable-diffusion-v1-5",
  fallback3: "CompVis/stable-diffusion-v1-4",
  fallback4: "prompthero/openjourney", // More reliable alternative
  qwen: "Qwen/Qwen-Image"
};

// API Configuration
const API_CONFIG = {
  baseUrl: "https://api-inference.huggingface.co/models",
  timeout: 30000, // 30 seconds
  retries: 3,
  models: IMAGE_MODELS
};

// Validate required environment variables
const validateEnvironment = () => {
  const errors = [];
  
  if (!VITE_BACKEND_URL) {
    errors.push('VITE_BACKEND_URL is not set in environment variables');
  }

  if (!HUGGING_FACE_API_KEY) {
    errors.push('VITE_HUGGING_FACE_API_KEY is not set in environment variables');
  } else if (HUGGING_FACE_API_KEY.length < 10) {
    errors.push('VITE_HUGGING_FACE_API_KEY appears to be invalid (too short)');
  }

  return errors;
};

// Enhanced API request function
const makeApiRequest = async (model, payload, options = {}) => {
  const { timeout = API_CONFIG.timeout, retries = API_CONFIG.retries } = options;
  
  if (!HUGGING_FACE_API_KEY) {
    throw new Error('Hugging Face API key is required');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/${model}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
        'User-Agent': 'FourAI-ImageGenerator/1.0'
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `API request failed with status: ${response.status}`;
      
      try {
        const errorData = JSON.parse(errorText);
        errorMessage += `. ${errorData.error || errorData.message || errorText}`;
      } catch {
        errorMessage += `. ${errorText}`;
      }

      throw new Error(errorMessage);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    
    throw error;
  }
};

// Check model availability
const checkModelStatus = async (model) => {
  try {
    const response = await fetch(`${API_CONFIG.baseUrl}/${model}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE_API_KEY}`,
        'User-Agent': 'FourAI-ImageGenerator/1.0'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      return {
        available: true,
        state: data.state || 'unknown',
        pipeline_tag: data.pipeline_tag || 'unknown'
      };
    } else {
      return {
        available: false,
        error: response.status
      };
    }
  } catch (error) {
    return {
      available: false,
      error: error.message
    };
  }
};

// Retry mechanism for API calls
const retryApiCall = async (model, payload, options = {}) => {
  const { retries = API_CONFIG.retries } = options;
  let lastError;

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await makeApiRequest(model, payload, options);
    } catch (error) {
      lastError = error;
      
      if (attempt === retries) {
        throw error;
      }
      
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
    }
  }
};

// Debug logging (only in development)
if (import.meta.env.DEV) {
  const envErrors = validateEnvironment();
  
  console.log('🔧 API Configuration:', {
    VITE_BACKEND_URL: VITE_BACKEND_URL ? '✅ set' : '❌ missing',
    apiBaseUrl: API_BASE_URL ? '✅ set' : '❌ missing',
    huggingFaceApiKey: HUGGING_FACE_API_KEY ? 
      `✅ set (${HUGGING_FACE_API_KEY.slice(0, 6)}...${HUGGING_FACE_API_KEY.slice(-4)})` : 
      '❌ missing',
    availableModels: Object.keys(IMAGE_MODELS).length
  });

  if (envErrors.length > 0) {
    console.error('❌ Environment validation errors:', envErrors);
  }
}

export default API_BASE_URL;
export { 
  HUGGING_FACE_API_KEY, 
  API_CONFIG, 
  IMAGE_MODELS, 
  makeApiRequest, 
  retryApiCall,
  checkModelStatus,
  validateEnvironment 
};