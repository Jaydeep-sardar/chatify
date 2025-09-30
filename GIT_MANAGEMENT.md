# Git Repository Management Guide

## 🔒 **CRITICAL FILES TO NEVER COMMIT**

### ❌ Environment Files (Contains Secrets)
```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
backend/.env
```
**Why:** Contains sensitive credentials like:
- MongoDB connection strings
- JWT secrets
- API keys (Cloudinary, Resend, Arcjet)

### ❌ Dependencies
```
node_modules/
```
**Why:** Large, auto-generated, platform-specific

### ❌ Build Outputs
```
dist/
build/
out/
frontend/dist/
```
**Why:** Generated files, can be rebuilt

### ❌ Cache & Temporary Files
```
.cache/
.vite/
tmp/
temp/
*.tmp
logs/
*.log
```

## ✅ **FILES THAT SHOULD BE COMMITTED**

### ✅ Source Code
```
src/
frontend/src/
backend/src/
```

### ✅ Configuration Files
```
package.json
package-lock.json
frontend/package.json
backend/package.json
vite.config.js
tailwind.config.js
eslint.config.js
postcss.config.js
```

### ✅ Environment Templates
```
.env.example
backend/.env.example
```
**Note:** Template files showing required environment variables WITHOUT actual values

### ✅ Documentation
```
README.md
SETUP.md
```

### ✅ Public Assets
```
frontend/public/
```
**Note:** Static assets like images, icons, sounds

## 🛡️ **Security Best Practices**

### 1. Environment File Management
- ✅ Commit `.env.example` with placeholder values
- ❌ Never commit actual `.env` files
- 🔄 Use different `.env` files for different environments

### 2. Secrets Management
```bash
# Good - Template file
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here

# Bad - Actual credentials in git
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/db
JWT_SECRET=actual_secret_key_123
```

### 3. API Keys & Tokens
- Never hardcode API keys in source code
- Use environment variables for all secrets
- Rotate keys regularly

## 📁 **Current Git Status**

### ✅ Already Protected
- ✅ `.env` files ignored
- ✅ `node_modules` ignored
- ✅ Build outputs ignored
- ✅ Cache directories ignored
- ✅ Logs ignored
- ✅ Temporary files ignored

### 📝 **Files Currently in Repository**
```
├── .gitignore (comprehensive rules)
├── package.json (project scripts)
├── README.md (project documentation)
├── SETUP.md (setup instructions)
├── update-mongo-uri.sh (utility script)
├── backend/
│   ├── .gitignore (backend-specific rules)
│   ├── package.json (backend dependencies)
│   ├── src/ (source code)
│   └── .env.example (environment template)
└── frontend/
    ├── .gitignore (frontend-specific rules)
    ├── package.json (frontend dependencies)
    ├── src/ (React source code)
    ├── public/ (static assets)
    └── vite.config.js (build configuration)
```

## 🚀 **Git Commands for This Project**

```bash
# Initialize repository (if not already done)
git init

# Check what will be committed
git status

# Add all tracked files
git add .

# Commit with meaningful message
git commit -m "Initial commit: Chatify real-time chat application"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/chatify.git

# Push to remote
git push -u origin main
```

## ⚠️ **Before First Commit**

1. **Verify `.env` is ignored:**
   ```bash
   git status
   # Should NOT show .env files
   ```

2. **Check for sensitive data:**
   ```bash
   grep -r "password\|secret\|key" . --exclude-dir=node_modules
   # Should only show template files or placeholder values
   ```

3. **Test build process:**
   ```bash
   npm run build
   # Ensure everything builds correctly
   ```

## 🔄 **Team Collaboration**

### For New Team Members:
1. Clone repository
2. Copy `.env.example` to `.env`
3. Fill in actual environment values
4. Run `npm install` in both backend and frontend
5. Start development servers

This ensures everyone has the same codebase but their own environment configuration!