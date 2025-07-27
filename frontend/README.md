# Four AI - AI Text Generation

This project integrates the HiDream-I1-Full model from HuggingFace with a React.js frontend application, enabling AI-powered text generation capabilities.

## Project Structure

- `/src` - React.js frontend application
- `/backend` - Python Flask API for serving the AI model

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install the required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

3. Start the backend server:
   ```bash
   python ai_service.py
   ```

   The server will start at http://localhost:5001

### Frontend Setup

1. Install the required npm packages:
   ```bash
   npm install
   ```

2. Start the React development server:
   ```bash
   npm run dev
   ```

   The application will be available at http://localhost:5173

## Docker Setup

You can also run the backend with Docker:

```bash
cd backend
docker build -t four-ai-backend .
docker run -p 5001:5001 four-ai-backend
```

## Using the AI Generator

1. Navigate to the AI Generator page from the main menu
2. Enter your text prompt in the provided field
3. Adjust the maximum length slider if needed
4. Click "Generate Text" to create AI-generated content
5. Copy the generated text to clipboard with the provided button

## Environment Variables

- Frontend:
  - Create a `.env` file in the root directory with:
    ```
    VITE_API_URL=http://localhost:5001
    ```

- Backend:
  - The backend can use the following environment variables:
    ```
    PORT=5001
    ```

## Deployment

- The frontend can be deployed to Vercel
- The backend should be deployed to a service that supports Python (e.g., Heroku, Railway, etc.)
- Make sure to update the API URL in the frontend's environment variables to point to your deployed backend

## Model Information

This application uses the HiDream-I1-Full model from HuggingFace, which is a powerful text generation model capable of producing creative and coherent text based on prompts. 

