# 📺 VTube

VTube is a **YouTube-inspired full-stack video streaming web application** that allows users to upload, watch, interact with, and manage video content. The platform is built using modern web technologies and follows scalable production-level architecture.

---

## 🚀 Project Overview

VTube provides a complete video-sharing ecosystem where users can:

- 📤 Upload and stream videos  
- ❤️ Like and comment on videos  
- 📺 Subscribe to creators  
- 📁 Create and manage playlists  
- 🔎 Explore video feeds and channels  
- 👤 Manage user profiles and authentication  

The backend exposes **REST APIs** designed to be consumed by frontend or mobile applications.

---

## ✨ Features

### 🔐 Authentication & Users
- User Registration & Login  
- JWT Authentication with Refresh Tokens  
- Profile Management  
- Secure Protected Routes  

---

### 🎬 Video Management
- Video Upload System  
- Video Streaming Support  
- Video Metadata Handling  
- Pagination & Feed System  

---

### 💬 Interaction Features
- Comment System  
- Like / Unlike Videos  
- Playlist Creation & Management  
- Channel Subscription System  

---

### 📊 Dashboard & Utilities
- Channel Analytics APIs  
- Health Check Endpoints  
- Cloud Media Storage Integration  

---

## 🛠 Tech Stack

### 🎨 Frontend
- React  
- Vite  
- Tailwind CSS  
- Axios  
- Context API  

---

### ⚙ Backend
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  
- Multer (File Uploads)  
- Cloudinary (Media Storage)  

---

## 🏗 Architecture

### Backend Architecture
- MVC Pattern  
- RESTful API Design  
- Modular Controllers  
- Middleware-Based Authentication  
- Cloud Media Upload Handling  

#### 📂 Backend Structure
```
server/
│
├── controllers
├── models
├── routes
├── middlewares
├── utils
├── db
├── app.js
└── index.js
```

---

### 📂 Frontend Structure
```
client/
│
├── components
├── pages
├── context
├── layout
├── api
├── hooks
├── utils
└── routes
```

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

## ⚡ Installation Guide

### 📥 Clone Repositories

#### Backend
```bash
git clone https://github.com/Dhirajsah18/vTube-backend-practice
cd vTube-backend-practice
npm install
```

---

#### Frontend
```bash
git clone https://github.com/Dhirajsah18/vTube-frontend-practice
cd vTube-frontend-practice/client
npm install
```

---

## 🔑 Environment Variables (Backend)

Create a `.env` file inside the backend root directory:

```
PORT=
MONGODB_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## ▶ Running the Project

### Start Backend
```bash
npm run dev
```

### Start Frontend
```bash
npm run dev
```

---

## 🎯 Learning Goals

This project demonstrates:

- Full Stack Development  
- REST API Design  
- Authentication Systems  
- Cloud Media Handling  
- Scalable UI Architecture  
- Production-Ready Web Application Development  

---

## 👨‍💻 Author

**Dhiraj Sah**  
🔗 GitHub: https://github.com/Dhirajsah18  
