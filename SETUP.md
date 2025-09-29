# Chatify - Real-time Chat Application

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v20+)
- MongoDB Atlas account or local MongoDB

### 📦 Installation Complete!
All dependencies have been installed:
- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed  
- ✅ Security vulnerabilities fixed
- ✅ Environment files configured

### 🔧 Configuration

#### 1. MongoDB Setup
**You need to update the MongoDB URI in the backend/.env file:**

```bash
# Option 1: Use the provided script
./update-mongo-uri.sh "mongodb+srv://username:password@cluster.mongodb.net/chatify"

# Option 2: Manually edit backend/.env
# Replace MONGO_URI=mongodb://localhost:27017/chatify
# With your MongoDB Atlas connection string
```

#### 2. Current Configuration Status
- ✅ JWT Secret: Generated
- ✅ CORS: Configured for localhost:5173
- ⚠️ MongoDB: **NEEDS YOUR CLUSTER URI**
- 🔧 Cloudinary: Demo keys (replace for production)
- 🔧 Resend Email: Demo keys (replace for production)
- 🔧 Arcjet Security: Demo keys (replace for production)

### 🏃‍♂️ Running the Application

#### Development Mode (Recommended)
```bash
# Terminal 1 - Backend (API Server)
cd backend
npm run dev
# Runs on: http://localhost:3000

# Terminal 2 - Frontend (React App)  
cd frontend
npm run dev
# Runs on: http://localhost:5173
```

#### Production Mode
```bash
# Build everything
npm run build

# Start production server
npm start
```

### 🌐 Application URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000
- **Socket.IO**: http://localhost:3000

### 🔧 Current Status
- ✅ Frontend: **RUNNING** on port 5173
- ⚠️ Backend: **WAITING for MongoDB URI**

### 📝 Next Steps
1. **Provide your MongoDB cluster connection string**
2. Backend will automatically restart and connect
3. Your chat app will be fully functional!

### 🎯 Features Ready
- Real-time messaging with Socket.IO
- User authentication with JWT
- File upload support (Cloudinary)
- Email notifications (Resend)
- Security protection (Arcjet)
- Modern UI with Tailwind CSS + DaisyUI

### 🔑 Service Setup (Optional - for full functionality)

#### Cloudinary (Image uploads)
1. Sign up at https://cloudinary.com
2. Get your credentials from dashboard
3. Update these in backend/.env:
   - CLOUDINARY_CLOUD_NAME
   - CLOUDINARY_API_KEY  
   - CLOUDINARY_API_SECRET

#### Resend (Email notifications)
1. Sign up at https://resend.com
2. Get API key
3. Update RESEND_API_KEY in backend/.env

#### Arcjet (Security)
1. Sign up at https://arcjet.com
2. Get API key
3. Update ARCJET_KEY in backend/.env