# Production Deployment Summary

## ✅ Configured URLs

### Frontend (Vercel)
- **URL**: `https://ai-math-doubt-solver-zeta.vercel.app`
- **GitHub**: your-repo-name
- **Environment Variable**: `VITE_BACKEND_URL` (to be set in Vercel dashboard)

### Backend (Render)
- **URL**: `https://ai-math-doubt-solver-oe7x.onrender.com`
- **GitHub**: your-repo-name/backend
- **Environment Variable**: `FRONTEND_URL` (already set in Render)

---

## 🔧 Current Configuration

### Frontend Code (src/api/backend.js)
```javascript
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5002';

export async function solveProblem(problem, grade = 'Grade 9-10', mode = 'hint') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/solve`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem: problem.trim(), grade, mode }),
    });
    // ... rest of function
  }
}
```
✅ Uses environment variable `VITE_BACKEND_URL`
✅ Falls back to localhost for development
✅ Calls `/api/solve` endpoint

### Backend Code (backend/server.js)
```javascript
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // ← Vercel frontend URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS not allowed'));
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true,
  maxAge: 3600
}));
```
✅ Allows your Vercel domain in CORS
✅ Includes development localhost URLs
✅ Dynamic CORS from environment

---

## 📝 Environment Files Set

### Frontend (.env) - Local
```env
VITE_BACKEND_URL=https://ai-math-doubt-solver-oe7x.onrender.com
```

### Backend (.env) - Local
```env
GEMINI_API_KEY=AIzaSyDOJh4rawS03fkLCfD_baMx4zLPnH_MoYc
PORT=5002
NODE_ENV=production
FRONTEND_URL=https://ai-math-doubt-solver-zeta.vercel.app
```

---

## ⚡ REQUIRED: Set in Vercel Dashboard

**These MUST be set or production won't work!**

### Vercel Project → Settings → Environment Variables

| Variable | Value | Environments |
|----------|-------|--------------|
| `VITE_BACKEND_URL` | `https://ai-math-doubt-solver-oe7x.onrender.com` | Production, Preview, Development |

**After adding:**
1. Go to Deployments
2. Find latest deployment
3. Click ⋯ (three dots)
4. Select "Redeploy"
5. Confirm "Redeploy"

---

## ✅ Render Configuration (Already Set)

### Render Service → Environment Variables

| Variable | Value |
|----------|-------|
| `GEMINI_API_KEY` | Your Gemini API key |
| `PORT` | `5002` |
| `NODE_ENV` | `production` |
| `FRONTEND_URL` | `https://ai-math-doubt-solver-zeta.vercel.app` |

✅ Already configured

---

## 🧪 Test After Configuration

### 1. Check Backend Health
```
https://ai-math-doubt-solver-oe7x.onrender.com/api/health
```
Should return: `{"status":"ok","message":"MathMind API is running",...}`

### 2. Test Frontend
```
https://ai-math-doubt-solver-zeta.vercel.app
```
1. Open DevTools (F12)
2. Go to Console tab
3. Enter a math problem
4. Click button
5. Should NOT see "Failed to fetch"
6. Should see solution from Gemini

### 3. Check Network Tab
- Request URL should be: `https://ai-math-doubt-solver-oe7x.onrender.com/api/solve`
- Status should be: 200 OK
- Response should have: `{"success":true,"solution":"..."}`

---

## 🔍 If Still Getting "Failed to fetch"

### Check List:

1. **Vercel env variable set?**
   - [ ] Dashboard → Project → Settings → Environment Variables
   - [ ] `VITE_BACKEND_URL` present?
   - [ ] Redeployed after adding?

2. **Backend online?**
   - [ ] Visit: `https://ai-math-doubt-solver-oe7x.onrender.com`
   - [ ] See API info page?

3. **CORS configured?**
   - [ ] Backend has `FRONTEND_URL` env var?
   - [ ] Value is: `https://ai-math-doubt-solver-zeta.vercel.app` (with https)?

4. **Check browser console for exact error**
   - [ ] CORS error? → Backend CORS issue
   - [ ] 404? → Wrong endpoint
   - [ ] 500? → Backend error

5. **Check Render logs**
   - [ ] Service → Logs
   - [ ] Any error messages?

---

## 📊 API Endpoint Reference

### Production
```
POST https://ai-math-doubt-solver-oe7x.onrender.com/api/solve

Request:
{
  "problem": "Solve 2x + 5 = 13",
  "grade": "Grade 9-10",
  "mode": "hint"
}

Response:
{
  "success": true,
  "solution": "Think about what number added to 5 equals 13...",
  "mode": "hint",
  "grade": "Grade 9-10",
  "problem": "Solve 2x + 5 = 13",
  "timestamp": "2026-04-18T..."
}
```

### Health Check
```
GET https://ai-math-doubt-solver-oe7x.onrender.com/api/health

Response:
{
  "status": "ok",
  "message": "MathMind API is running",
  "timestamp": "2026-04-18T..."
}
```

---

## 📋 Verification Checklist

Before declaring success:

- [ ] Frontend .env updated with Render backend URL
- [ ] Vercel env variable `VITE_BACKEND_URL` set
- [ ] Vercel project redeployed
- [ ] Backend .env has Vercel frontend URL  
- [ ] Backend health check passes
- [ ] Can solve a problem without "Failed to fetch"
- [ ] Browser console shows no CORS errors
- [ ] Network tab shows successful API response

---

## 🎯 Summary

| Component | Local | Production |
|-----------|-------|------------|
| Frontend Dev | `http://localhost:5173` | `https://ai-math-doubt-solver-zeta.vercel.app` |
| Frontend Backend URL | `http://localhost:5002` | `https://ai-math-doubt-solver-oe7x.onrender.com` |
| Backend Dev | `http://localhost:5002` | `https://ai-math-doubt-solver-oe7x.onrender.com` |
| Backend CORS Origin | `http://localhost:5173` | `https://ai-math-doubt-solver-zeta.vercel.app` |
| API Endpoint | `POST /api/solve` | `POST /api/solve` |
| Health Check | `GET /api/health` | `GET /api/health` |

---

## 🚀 Next Steps

1. **DO THIS NOW**: 
   - Go to Vercel Dashboard
   - Add `VITE_BACKEND_URL` environment variable
   - Redeploy

2. **THEN TEST**:
   - Visit Vercel frontend URL
   - Try solving a problem
   - Check if it works

3. **IF NOT WORKING**:
   - Check Render backend logs
   - Check Vercel build logs
   - Verify environment variables match exactly
   - Check browser DevTools for CORS errors

