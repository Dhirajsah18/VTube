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

<<<<<<< HEAD
## Setup
=======
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
>>>>>>> 1fe173b9c0f2dd7d6ce84ac10a4c065883a6c69f

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
