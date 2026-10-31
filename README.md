# Four AI — AI-Powered Voice & Image Generation Platform

Four AI is a full-stack **Next.js (App Router)** application that provides
AI-powered tools for voice generation, text-to-speech, speech-to-text, voice
changing, and image generation — frontend and backend in a single deployable app.

- **Frontend**: React 19 + Next.js 15 + Tailwind CSS 4 + Framer Motion + GSAP
- **Backend**: Next.js Route Handlers (`app/api/**`) with Neon PostgreSQL,
  bcrypt password hashing, DB-backed sessions, and a server-side Hugging Face proxy

## Live Demo

https://four-ai-dev.vercel.app/

---

## Features

### AI Tools
- **Voice Generator** — type anything and hear it in natural browser voices,
  with speed control and quick-start presets
- **Text to Speech** — full TTS studio: language/voice selection, speed,
  per-voice previews and use-case presets
- **Speech to Text** — dictate in the browser and get a live transcript
  (Web Speech API, client-side)
- **Voice Changer** — apply effects (robot, echo, reverb, distortion, tremolo,
  lowpass, slow, fast) to uploaded audio; processed locally in the browser
  with the Web Audio API, exported as WAV
- **Image Generator** — text-to-image via Stable Diffusion. The Hugging Face
  token stays on the server; the client calls our own `/api/generate/image`.
  Limited to **25 images per user per rolling 24 hours** (admins bypass);
  the remaining quota is returned in the `X-Quota-Remaining` response header

### User Features
- Secure signup / login / logout (bcrypt-hashed passwords, DB-backed sessions
  that expire after **30 days**)
- Email verification on signup — accounts must verify their address before logging in
- **Token-based forgot password flow** — `POST /api/auth/forgot-password` only
  emails a single-use reset link (valid **1 hour**); the response is generic so
  it never reveals whether an account exists. Setting a new password via
  `/reset-password?token=…` invalidates **all** existing sessions
- Profile management (name, phone, address, avatar upload with client-side resize)
- Settings: display name, email change (uniqueness-checked, applied only after
  the confirmation link sent to the new address is clicked), password change
- Usage history synced to your account

### Admin Features
- Admin logs in via the normal login page (`ADMIN_EMAIL` env var grants the admin role)
- Live user list straight from PostgreSQL (search + stats)
- Ban / unban users — banning also kills their active sessions

### Security
- Passwords hashed with **bcrypt (cost 12)**; all SQL is parameterized
- Single-use, expiring tokens for email verification, email change and password reset
- Rate limiting on sensitive auth endpoints (forgot-password, reset-password)
- Sessions expire after 30 days; expired tokens are cleaned up on use
- Image-generation quota (25/user/24h) protects the shared Hugging Face allowance
- No debug/test API routes are exposed

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15 (App Router), React 19, JavaScript |
| Styling | Tailwind CSS 4, Framer Motion, GSAP, React Icons |
| Backend | Next.js Route Handlers (Node runtime) |
| Database | Neon PostgreSQL via `@neondatabase/serverless` (HTTP driver) |
| Auth | bcryptjs, DB-backed bearer sessions (30-day expiry), role-based admin access |
| Email | Gmail SMTP (Nodemailer) → Resend HTTP API → console fallback (see below) |
| AI | Hugging Face Inference API (server-side proxy), Web Speech API, Web Audio API |

---

## Project Structure

```
├── app/
│   ├── layout.jsx                 # Root layout (fonts, Toaster, metadata)
│   ├── page.jsx                   # Landing page (/)
│   ├── globals.css                # Tailwind 4 theme + design system
│   ├── (public)/                  # Marketing pages (Navbar + Footer)
│   │   ├── layout.jsx
│   │   ├── home/
│   │   ├── features/
│   │   ├── pricing/
│   │   ├── team/
│   │   └── explore-voice-library/
│   ├── login/ · signup/ · forgot-password/ · reset-password/ · logout/
│   ├── verify-email/              # "Check your inbox" page after signup
│   ├── (protected)/               # Auth-guarded pages (client guard + shell)
│   │   ├── layout.jsx
│   │   ├── voice-generator/ · text-to-speech/ · speech-to-text/
│   │   ├── voicechanger/ · imagegenerator/
│   │   └── profile/ · settings/ · history/
│   ├── admin/dashboard/
│   └── api/                       # ★ Backend (Route Handlers)
│       ├── auth/signup|login|logout|forgot-password|reset-password/route.js
│       ├── auth/verify-email|confirm-email|resend-verification/route.js
│       ├── account/profile|email|password|history/route.js
│       ├── admin/users|ban-user/route.js
│       └── generate/image/route.js    # Hugging Face proxy + daily quota
├── components/                    # Navbar, Footer, PageShell, Toaster,
│                                  # FloatingIcons, GsapAnimations, VoiceGeneratorTool
├── lib/
│   ├── db.js                      # Neon SQL client + schema init (ensureSchema)
│   ├── session.js                 # Bearer-token auth helpers (server)
│   ├── auth-client.js             # localStorage session helpers (client)
│   ├── api.js                     # fetch wrapper for /api/*
│   ├── http.js                    # validation / rate-limit / base-URL utils
│   ├── email.js                   # Gmail SMTP → Resend → console fallback
│   ├── usage.js                   # Image quota (25/user/24h, from activities)
│   ├── toast.js · useSpeech.js · wavEncoder.js
└── public/                        # logo + team images
```

## API Routes

All routes live under `/api` in this same app (same-origin — no CORS needed).

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/signup` | Register new user (sends verification email) | None |
| POST | `/api/auth/login` | Login (returns session token, 30-day expiry) | None |
| GET | `/api/auth/verify-email?token=…` | Verify signup email from the emailed link (redirects to `/login`) | None |
| POST | `/api/auth/resend-verification` | Resend verification email | None |
| POST | `/api/auth/logout` | Invalidate session | Bearer |
| POST | `/api/auth/forgot-password` | Email a single-use password-reset link (1h expiry, generic response) | None |
| POST | `/api/auth/reset-password` | Set a new password with a reset token (invalidates all sessions) | None (token) |
| GET | `/api/auth/confirm-email?token=…` | Confirm a pending email change (redirects to `/settings`) | None (token) |
| GET/PUT | `/api/account/profile` | Read / update profile | Bearer |
| PUT | `/api/account/email` | Request email change (confirmation link sent to the new address) | Bearer |
| PUT | `/api/account/password` | Change password | Bearer |
| GET/POST | `/api/account/history` | Read / record activity history | Bearer |
| GET | `/api/admin/users?search=` | List users | Bearer (admin role) |
| POST | `/api/admin/ban-user` | Ban / unban a user | Bearer (admin role) |
| POST | `/api/generate/image` | Generate an image from a prompt (25/day quota, `X-Quota-Remaining` header) | Bearer |

## Database Schema

Created automatically on the first API request via `ensureSchema()`
(idempotent `CREATE TABLE` / `ALTER TABLE … IF NOT EXISTS` — no manual
migrations, including on deploy):

```sql
users     (id, name, email UNIQUE, password /* bcrypt */, phone, address,
           avatar, banned, role /* 'user' | 'admin' */,
           email_verified, verification_token, verification_expires,
           pending_email, email_change_token, email_change_expires,
           password_reset_token, password_reset_expires, created_at)
sessions  (token UUID PK, user_id -> users, expires_at /* +30 days */, created_at)
activities(id, user_id -> users, feature, description, created_at)
```

Image quota is counted from `activities` where `feature = 'image'` in the
last 24 hours.

---

## Environment Variables

Create `.env.local` in the project root (see `.env.example`):

```env
DATABASE_URL=postgres://…          # Neon PostgreSQL connection string
ADMIN_EMAIL=admin@example.com      # account that gets the admin role

# Email delivery — first configured provider wins (lib/email.js):
GMAIL_USER=you@gmail.com           # 1. Gmail SMTP (recommended)
GMAIL_APP_PASSWORD=…               #    Gmail App Password
RESEND_API_KEY=re_…                # 2. Resend HTTP API (fallback)
EMAIL_FROM="Four AI <onboarding@resend.dev>"

HUGGING_FACE_API_KEY=hf_…          # server-side image generation token
```

> If no email provider is configured, verification / reset / email-change
> links are printed to the server console instead of being emailed.
> No `VITE_*` variables are needed — frontend and backend are one app.

## Local Setup

```bash
npm install
cp .env.example .env.local     # fill in your values
npm run dev                    # http://localhost:3000
```

Other scripts: `npm run build`, `npm start`.

## Deployment (Vercel)

1. Create a free database at [neon.tech](https://neon.tech).
2. Import this repo into Vercel (framework/build are set in `vercel.json` —
   Next.js, `next build`, output `.next`).
3. Add environment variables: `DATABASE_URL`, `ADMIN_EMAIL`,
   `HUGGING_FACE_API_KEY`, and your email provider (`GMAIL_USER` +
   `GMAIL_APP_PASSWORD`, or `RESEND_API_KEY`).
4. Deploy. Frontend and API deploy together, and the DB schema
   auto-migrates on the first request — no extra steps.

## Image Generation Models

Tried in order until one succeeds (all proxied through the backend,
90-second timeout per model):

1. `stabilityai/stable-diffusion-2-1`
2. `stabilityai/stable-diffusion-xl-base-1.0`
3. `runwayml/stable-diffusion-v1-5`

## Voice Changer Effects

Normal · Robot · Slow · Fast · Echo · Distortion · Reverb · Tremolo · Lowpass filter

## Pages & Routes

| Route | Page | Access |
|-------|------|--------|
| `/` | Landing page | Public |
| `/home`, `/features`, `/pricing`, `/team` | Marketing pages | Public |
| `/explore-voice-library` | Voice library | Public |
| `/login`, `/signup`, `/verify-email`, `/forgot-password`, `/reset-password`, `/logout` | Auth | Public |
| `/voice-generator`, `/text-to-speech`, `/speech-to-text`, `/voicechanger`, `/imagegenerator` | AI tools | Auth required |
| `/profile`, `/settings`, `/history` | Account | Auth required |
| `/admin/dashboard` | Admin panel | Admin (role-based) |

Note: `/texttospeech` permanently redirects to `/text-to-speech`
(see `next.config.mjs`).

## Team

| Name | Role |
|------|------|
| Saif Ur Rahman | Lead Developer |
| Abdullah Bin Asim | Frontend Developer |
| M Adeel Gujar | Backend Developer |
| Malik Mujahid Azam Lail | UI/UX Designer |

## License

This project is for educational and personal use.
