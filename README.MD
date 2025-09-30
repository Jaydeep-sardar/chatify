<h1 align="center">✨ Chatify - Premium Real-Time Chat Application ✨</h1>

![Demo App](/frontend/public/screenshot-for-readme.png)

<p align="center">
  <strong>🎯 Next-Gen Chat Experience with Voice/Video Calls & Advanced Theming</strong>
</p>

## 🚀 Premium Features & USPs

### 📞 **Voice & Video Calling System**
- 🎙️ **WebRTC Voice Calls** - Crystal clear audio communication
- 📹 **HD Video Calls** - High-definition video with camera controls
- 🎮 **Real-time Call Controls** - Mute, video toggle, call management
- 📱 **Picture-in-Picture** - Local video overlay during calls
- ⚡ **Socket.IO Integration** - Real-time call signaling & WebRTC negotiation
- 🔔 **Call Status Indicators** - Visual feedback for call states

### 🎨 **Advanced Theme System**
- 🌌 **6 Premium Themes** - Cosmic, Ocean, Sunset, Forest, Neon, Minimal
- ✨ **Personality System** - Unique animations & behaviors per theme
- 🎛️ **Custom Theme Creator** - Full color picker with hex/RGB support
- 💾 **Theme Export/Import** - Save and share custom themes
- ⚡ **Dynamic CSS Variables** - Real-time theme switching
- 🎯 **Theme-Aware Components** - All UI elements adapt to selected theme

### 💎 **Premium UI/UX Enhancements**
- 🌟 **Glass Morphism Design** - Modern frosted glass effects
- 🎭 **Advanced Animations** - Smooth 60fps transitions & effects
- 💬 **WhatsApp-like Features** - Message counts, status indicators
- 🔔 **Smart Notifications** - Toast system with sound effects
- 🎵 **Interactive Sound System** - Keyboard sounds, notification sounds
- 📱 **Responsive Design** - Mobile & desktop optimized

## 🔥 Core Features

- 🔐 **Custom JWT Authentication** (no 3rd-party auth)
- ⚡ **Real-time Messaging** via Socket.io
- 🟢 **Online/Offline Presence** Indicators
- 🔔 **Notification & Typing Sounds** (with toggle)
- 📨 **Welcome Emails** on Signup (Resend)
- 🗂️ **Image Uploads** (Cloudinary)
- 🧰 **REST API** with Node.js & Express
- 🧱 **MongoDB** for Data Persistence
- 🚦 **API Rate-Limiting** powered by Arcjet
- 🎨 **Beautiful UI** with React, Tailwind CSS & DaisyUI
- 🧠 **Zustand** for State Management
- 🧑‍💻 **Git & GitHub Workflow** (branches, PRs, merges)
- 🚀 **Easy Deployment** (free-tier friendly)

---

## 🧪 .env Setup

### Backend (`/backend`)

```bash
PORT=3000
MONGO_URI=your_mongo_uri_here

NODE_ENV=development

JWT_SECRET=your_jwt_secret

RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_email_from_address
EMAIL_FROM_NAME=your_email_from_name

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

ARCJET_KEY=your_arcjet_key
ARCJET_ENV=development
```

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 How to Use Premium Features

### 📞 Voice & Video Calls
1. **Start a Call**: Click the phone (🎙️) or video (📹) icon in the chat header
2. **Answer/Reject**: Incoming calls show with accept/reject buttons
3. **Call Controls**: Use mute, video toggle, and end call buttons during active calls
4. **Picture-in-Picture**: Your local video appears as overlay during video calls

### 🎨 Theme Customization
1. **Quick Switch**: Click the palette icon (🎨) for quick theme selection
2. **Theme Studio**: Access full customization with "Customize..." option
3. **Create Themes**: Use color picker to create custom themes
4. **Export/Import**: Save and share your custom themes
5. **Real-time Preview**: See changes instantly as you customize

### 🌟 Available Themes
- **🌌 Cosmic**: Purple/Blue gradients with floating animations
- **🌊 Ocean**: Teal/Cyan with wave effects  
- **🌅 Sunset**: Orange/Pink warm tones
- **🌲 Forest**: Green/Emerald nature theme
- **⚡ Neon**: Electric cyan with pulse effects
- **⚪ Minimal**: Clean grayscale aesthetic

---

## 🛠️ Technical Stack

### Frontend
- **React 19.1.1** - Latest React with concurrent features
- **Zustand** - Lightweight state management
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Beautiful component library
- **WebRTC** - Peer-to-peer voice/video communication
- **Socket.IO Client** - Real-time communication

### Backend
- **Node.js & Express** - Server runtime & framework
- **Socket.IO** - Real-time WebSocket server
- **MongoDB** - NoSQL database
- **JWT** - Secure authentication
- **Cloudinary** - Image upload & management
- **Resend** - Email service
- **Arcjet** - Rate limiting & security

---

## 🌐 Browser Compatibility

- **Voice/Video Calls**: Modern browsers with WebRTC support (Chrome, Firefox, Safari, Edge)
- **Themes**: All modern browsers with CSS custom properties support
- **Responsive**: Optimized for mobile and desktop
- **Performance**: Smooth 60fps animations across devices

---

## 📱 Deployment Ready

- **Frontend**: Vercel, Netlify, or any static hosting
- **Backend**: Heroku, Railway, Render, or any Node.js hosting
- **Database**: MongoDB Atlas (free tier available)
- **CDN**: Cloudinary for images (free tier available)

---

## 🎨 Screenshots

### Theme Variations
![Cosmic Theme](/frontend/public/cosmic-theme.png)
![Ocean Theme](/frontend/public/ocean-theme.png)

### Voice/Video Calls
![Video Call Interface](/frontend/public/video-call.png)
![Voice Call Interface](/frontend/public/voice-call.png)

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <strong>🚀 Built with ❤️ by Jaydeep Sardar</strong><br>
  <em>Making real-time communication beautiful and accessible</em>
</p>
