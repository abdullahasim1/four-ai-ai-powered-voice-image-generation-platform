# Four AI - AI-Powered Voice & Image Generation Platform

![Four AI](./public/logo.png)

Four AI is a full-stack web application that provides AI-powered tools for voice generation, text-to-speech, voice changing, and image generation. Built with React + Vite on the frontend and Vercel Serverless Functions on the backend, with Neon PostgreSQL as the database.

---

## Live Demo

https://four-ai-dev.vercel.app/

---

## Features

### AI Tools
- **Voice Generator** - Generate natural-sounding speech from text using Web Speech API
- **Text to Speech** - Convert any text to speech with multiple voice and language options
- **Voice Changer** - Apply audio effects (robot, echo, reverb, distortion, tremolo, lowpass) to uploaded audio files
- **Image Generator** - Generate images from text prompts using Hugging Face FLUX.1 models

### User Features
- User authentication (Signup, Login, Logout)
- Forgot password / Reset password
- User profile management (name, email, phone, address, profile picture)
- User settings (update name, email, password)
- Usage history tracking
- Explore voice library

### Admin Features
- Secure admin login via environment variable password
- View all registered users from database
- Ban / Unban users

### General
- Fully responsive design
- Smooth animations with Framer Motion and GSAP
- Dark theme on Home page
- Glassmorphism UI elements

---

## Tech Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 19 | UI Framework |
| Vite | Build Tool |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| GSAP | Advanced Animations |
| React Router DOM 7 | Routing |
| Axios | HTTP Requests |
| React Icons | Icons |

### Backend (Vercel Serverless Functions)
| Technology | Purpose |
|-----------|---------|
| Vercel Functions | Serverless API Routes |
| Neon PostgreSQL | Database |
| @neondatabase/serverless | Neon DB Client |
| bcryptjs | Password Hashing |

### External APIs
| API | Purpose |
|-----|---------|
| Hugging Face Inference API | Image Generation (FLUX.1) |
| Web Speech API | Text to Speech & Voice |
| Web Audio API | Voice Changer Effects |

---

## Project Structure

```
four-ai/
└── frontend/
    ├── api/                        # Vercel Serverless Backend
    │   ├── _db.js                  # Neon DB connection
    │   ├── login.js                # POST /api/login
    │   ├── signup.js               # POST /api/signup
    │   ├── forgot-password.js      # POST /api/forgot-password
    │   └── admin/
    │       ├── users.js            # GET /api/admin/users
    │       └── ban-user.js         # POST /api/admin/ban-user
    ├── public/
    │   ├── logo.png
    │   └── logo copy.png
    ├── src/
    │   ├── admin/
    │   │   ├── AdminLogin.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   └── UserManagement.jsx
    │   ├── animations/
    │   │   ├── homeAnimations.js
    │   │   ├── loginAnimations.js
    │   │   ├── motionAnimations.js
    │   │   ├── signupAnimations.js
    │   │   ├── signupMotionAnimations.js
    │   │   └── startpageAnimations.js
    │   ├── assets/
    │   │   └── images/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   └── Footer.jsx
    │   ├── pages/
    │   │   ├── Startpage.jsx
    │   │   ├── Home.jsx
    │   │   ├── Features.jsx
    │   │   ├── Pricing.jsx
    │   │   ├── Team.jsx
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   ├── Logout.jsx
    │   │   ├── Profile.jsx
    │   │   ├── Settings.jsx
    │   │   ├── History.jsx
    │   │   ├── VoiceGenerator.jsx
    │   │   ├── TexttoSpeech.jsx
    │   │   ├── VoiceChanger.jsx
    │   │   ├── ImageGenerator.jsx
    │   │   └── ExploreVoiceLibrary.jsx
    │   ├── utils/
    │   │   ├── historyTracker.js
    │   │   └── wavEncoder.js
    │   ├── api.jsx                 # API config & Hugging Face helpers
    │   ├── App.jsx                 # Routes
    │   ├── main.jsx
    │   ├── index.css
    │   └── App.css
    ├── .env.local                  # Local environment variables
    ├── .env.example                # Example env file
    ├── vercel.json                 # Vercel deployment config
    ├── vite.config.js
    └── package.json
```

---

## API Routes

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/signup` | Register new user | None |
| POST | `/api/login` | Login user | None |
| POST | `/api/forgot-password` | Reset password | None |
| GET | `/api/admin/users` | Get all users | Admin Token |
| POST | `/api/admin/ban-user` | Ban or unban user | Admin Token |

---

## Database Schema

```sql
CREATE TABLE users (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(255) NOT NULL,
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,       -- bcrypt hashed
  banned      BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Environment Variables

Create a `.env.local` file in the `frontend/` directory:

```env
# Hugging Face API Key (for image generation)
# Get it from: https://huggingface.co/settings/tokens
VITE_HUGGING_FACE_API_KEY=hf_xxxxxxxxxxxxxxxxxx

# Neon PostgreSQL Connection String
# Get it from: https://neon.tech dashboard
DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require

# Admin Password (for admin panel access)
VITE_ADMIN_PASSWORD=your_strong_admin_password
```

---

## Local Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Neon account (free)
- Hugging Face account (free)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/your-username/four-ai.git
cd four-ai/frontend

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
# Fill in your values in .env.local

# 4. Start development server
npm run dev
```

App will run at `http://localhost:5173`

---

## Deployment on Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project
3. Import your GitHub repository
4. Set **Root Directory** to `frontend`
5. Add these **Environment Variables** in Vercel dashboard:

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Your Neon connection string |
| `VITE_HUGGING_FACE_API_KEY` | Your HuggingFace token |
| `VITE_ADMIN_PASSWORD` | Your admin password |

6. Click **Deploy**

---

## Image Generation Models

The app uses Hugging Face models in this priority order:

| Priority | Model | Quality |
|----------|-------|---------|
| 1st | `black-forest-labs/FLUX.1-schnell` | ⭐⭐⭐⭐⭐ Fastest |
| 2nd | `black-forest-labs/FLUX.1-dev` | ⭐⭐⭐⭐⭐ Best Quality |
| 3rd | `stabilityai/stable-diffusion-3.5-large` | ⭐⭐⭐⭐ |
| 4th | `stabilityai/stable-diffusion-xl-base-1.0` | ⭐⭐⭐ |
| 5th | `stabilityai/stable-diffusion-2-1` | ⭐⭐ Fallback |

---

## Voice Changer Effects

| Effect | Description |
|--------|-------------|
| Normal | No effect applied |
| Robot | High-pass filter with gain boost |
| Slow | Reduced playback speed |
| Fast | Increased playback speed |
| Echo | Delay with feedback |
| Distortion | Wave shaper distortion |
| Reverb | Convolution reverb |
| Tremolo | LFO amplitude modulation |
| Lowpass | Low-pass filter at 800Hz |

---

## Pages & Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Start Page | Public |
| `/home` | Home | Public |
| `/features` | Features | Public |
| `/pricing` | Pricing | Public |
| `/team` | Team | Public |
| `/login` | Login | Public |
| `/signup` | Signup | Public |
| `/forgot-password` | Forgot Password | Public |
| `/explore-voice-library` | Voice Library | Public |
| `/voice-generator` | Voice Generator | Auth Required |
| `/text-to-speech` | Text to Speech | Auth Required |
| `/voicechanger` | Voice Changer | Auth Required |
| `/imagegenerator` | Image Generator | Auth Required |
| `/profile` | Profile | Auth Required |
| `/settings` | Settings | Auth Required |
| `/history` | History | Auth Required |
| `/admin/login` | Admin Login | Admin |
| `/admin/dashboard` | Admin Dashboard | Admin |

---

## Team

| Name | Role |
|------|------|
| Saif Ur Rahman | Lead Developer |
| Abdullah Bin Asim | Frontend Developer |
| M Adeel Gujar | Backend Developer |
| Malik Mujahid Azam Lail | UI/UX Designer |

---

## License

This project is for educational and personal use.  
FLUX.1 [dev] model is used under the [FLUX.1 Non-Commercial License](https://huggingface.co/black-forest-labs/FLUX.1-dev/blob/main/LICENSE.md).
