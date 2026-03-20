# VTube

VTube is a full-stack video streaming app inspired by YouTube. This repository contains both:

- `client/` - React + Vite frontend
- `server/` - Node.js + Express + MongoDB backend API

## Features

- JWT authentication with refresh token flow
- Video upload and streaming-ready metadata APIs
- Comments, likes, playlists, and subscriptions
- Channel/dashboard endpoints
- Cloudinary media integration

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Axios, React Router
- Backend: Node.js, Express, MongoDB (Mongoose), JWT, Multer, Cloudinary

## Project Structure

```text
.
|- client/
|  |- src/
|  |  |- api/
|  |  |- components/
|  |  |- context/
|  |  |- hooks/
|  |  |- layout/
|  |  |- pages/
|  |  |- routes/
|  |  `- utils/
|  `- package.json
`- server/
   |- src/
   |  |- controllers/
   |  |- db/
   |  |- middlewares/
   |  |- models/
   |  |- routes/
   |  |- utils/
   |  |- app.js
   |  `- index.js
   `- package.json
```

## Prerequisites

- Node.js
- npm
- MongoDB instance
- Cloudinary account

## Setup

---
## 📸 Screenshots
### Home Page
<img width="1918" height="846" alt="image" src="https://github.com/user-attachments/assets/4659d417-e669-485d-818a-56e6b025254e" />

### Video Play
<img width="1918" height="866" alt="image" src="https://github.com/user-attachments/assets/06035c41-fc8e-4e20-988c-88232bee568f" />

### Dashboard
<img width="1910" height="492" alt="image" src="https://github.com/user-attachments/assets/c25d2619-b28e-41df-a794-0526b71a370e" />

### Upload Page
<img width="1910" height="847" alt="image" src="https://github.com/user-attachments/assets/3015216d-9275-4370-b96d-38be78c1cbac" />
---

1. Clone this repository:

```bash
git clone <your-repo-url>
cd vTube
```

2. Install backend dependencies:

```bash
cd server
npm install
```

3. Install frontend dependencies:

```bash
cd ../client
npm install
```

## Environment Variables (server/.env)

Create `server/.env` with:

```env
PORT=8000
MONGODB_URI=
CORS_ORIGIN=http://localhost:5173

ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=1d
REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=10d

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Run Locally

1. Start backend (from `server/`):

```bash
npm run dev
```

2. Start frontend (from `client/`):

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:8000` by default.

## Deployment (Vercel + Render)

### 1) Deploy backend on Render

- Render service root: `server`
- Build command: `npm install`
- Start command: `npm start`
- Health check path: `/api/v1/healthcheck`
- Optional blueprint file is added at `render.yaml`.

Set these Render environment variables:

- `NODE_ENV=production`
- `MONGODB_URI=<your-mongodb-uri>`
- `CORS_ORIGIN=https://your-vercel-project.vercel.app`
- `ACCESS_TOKEN_SECRET=<strong-random-secret>`
- `ACCESS_TOKEN_EXPIRY=1d`
- `REFRESH_TOKEN_SECRET=<strong-random-secret>`
- `REFRESH_TOKEN_EXPIRY=10d`
- `CLOUDINARY_CLOUD_NAME=<cloud-name>`
- `CLOUDINARY_API_KEY=<api-key>`
- `CLOUDINARY_API_SECRET=<api-secret>`

You can copy defaults from `server/.env.example`.

### 2) Deploy frontend on Vercel

- Framework preset: `Vite`
- Root directory: `client`
- Build command: `npm run build`
- Output directory: `dist`

Set this Vercel environment variable:

- `VITE_API_URL=https://your-render-service.onrender.com/api/v1`

SPA route fallback is configured in `client/vercel.json`.

### 3) Final connect check

- Open frontend URL and test login/signup.
- In browser network tab, API calls should hit Render URL.
- In production, cookies should be `Secure` + `SameSite=None`.

### 4) Security note

- If real secrets were ever committed to any `.env` file, rotate them now:
   - MongoDB password
   - JWT access/refresh secrets
   - Cloudinary API secret

## API Base Path

Backend routes are mounted under:

- `/api/v1/healthcheck`
- `/api/v1/users`
- `/api/v1/videos`
- `/api/v1/comments`
- `/api/v1/likes`
- `/api/v1/playlists`
- `/api/v1/subscriptions`
- `/api/v1/tweets`
- `/api/v1/dashboard`

## Author

Dhiraj Sah
GitHub: https://github.com/Dhirajsah18
