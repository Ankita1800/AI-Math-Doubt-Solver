# AI Math Doubt Solver - API Integration Status

## 🎯 Current State: Backend ✅ | API Access ❌

### Infrastructure Status

#### ✅ Backend Server Running
- **Port**: 5002  
- **Endpoint**: `http://localhost:5002/api/ask-gemini`
- **Status**: Actively listening and responding  
- **Health Check**: `GET http://localhost:5002/health`

#### ✅ Frontend Dev Server Running  
- **Port**: 5178
- **URL**: `http://localhost:5178`
- **Status**: Fully operational with black & white theme
- **Connected to**: Backend on port 5002

#### ✅ Integration Architecture
- Frontend → Backend HTTP calls over JSON
- Backend → Gemini API (via node-fetch)
- All CORS headers properly configured
- API key handled securely server-side

---

## ❌ API Access Issue: Quota Exceeded

### Problem
Current API Key: `AIzaSyD6V0IXHibYZwZH_aaHsFJVvZy0fofZI0k`

**Error**: All Gemini models returning 404/429  
- `gemini-2.0-flash`: 429 (Quota Exceeded)
- `gemini-1.5-pro`: 404 (Not Found)
- `gemini-1.5-flash`: 404 (Not Found)  
- `gemini-pro`: 404 (Not Found)

### Root Cause
- API key quota has been exceeded
- OR API key lacks access to requested models
- OR Free tier limitations reached

---

## 🔧 How to Fix (Setup New API Key)

### Step 1: Get New API Key
1. Go to https://makersuite.google.com/app/apikey
2. Click "Create API Key"
3. Copy the new key

### Step 2: Update .env File
```bash
# File: .env
GEMINI_API_KEY=<your-new-api-key>  # Paste new key here
VITE_BACKEND_URL=http://localhost:5002
PORT=5002
```

### Step 3: Restart Backend
```bash
npm run dev:backend
```

### Step 4: Test API
```bash
# Using curl/Invoke-WebRequest:
$body = @{ 
    problem = "Solve: x² + 5x - 6 = 0"
    grade = "Grade 9-10"
    stage = "hint"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:5002/api/ask-gemini" `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

### Step 5: Test in Frontend
1. Navigate to http://localhost:5178
2. Select grade and topic
3. Enter math problem
4. Click "Hint" button
5. Verify response displays

---

## 📋 Backend API Documentation

### Endpoint: `/api/ask-gemini`
**Method**: POST  
**Content-Type**: application/json

#### Request Body
```json
{
  "problem": "Solve: x² + 5x - 6 = 0",
  "grade": "Grade 9-10",
  "stage": "hint"
}
```

#### Response (Success)
```json
{
  "content": "Think about factors of -6 that add up to 5..."
}
```

#### Response (Quota Error)  
```json
{
  "error": "No available Gemini models. Status: 429. {\"error\": {\"code\": 429, \"message\": \"You exceeded your current quota..."}}"
}
```

#### Stages
- **hint**: Single clue (2-3 lines) pointing in right direction
- **nextStep**: First step with brief explanation, student continues
- **solution**: Complete step-by-step solution with reasoning

#### Grade Levels  
- Grade 5–6
- Grade 7–8
- Grade 9–10
- Grade 11–12

---

## 📊 Architecture Diagram

```
User Frontend (http://localhost:5178)
        ↓
  React + Zustand
        ↓
Gemini API client (src/api/gemini.js)
        ↓
HTTP POST to Backend (http://localhost:5002)
        ↓
Express.js Server (server.js:128)
        ↓
Gemini API (Google Cloud)
        ↓
AI Generated Response
        ↓
Backend returns {content: "..."}
        ↓
Frontend displays in Chat
        ↓
User sees formatted math solution
```

---

## 🐛 Troubleshooting

### Backend Won't Start
```
Error: EADDRINUSE :::5002
```
**Solution**: Port 5002 is in use. Change PORT in .env or kill process:
```bash
Get-Process -Id (Get-NetTCPConnection -LocalPort 5002).OwningProcess | Stop-Process -Force
```

### Frontend Can't Connect to Backend
**Check**: 
1. Backend running on port 5002?
2. Frontend has correct `VITE_BACKEND_URL` in .env?
3. Frontend dev server restarted after .env change?

```bash
# Kill old frontend, restart:
npm run dev
```

### API Returns 404 for All Models
**Cause**: API key doesn't have access to those models  
**Fix**: Follow "How to Fix" section above with new API key

### API Returns 429 (Quota Exceeded)
**Cause**: API quota limit reached  
**Fix**: 
- Wait for quota reset (varies by account type)
- Get premium Google Cloud API key
- Check quota at: https://console.cloud.google.com

---

## ✨ Next Steps After API Key Fix

1. Reload frontend at http://localhost:5178
2. Enter math problem: "Solve: x + 5 = 10"
3. Click "Hint" button
4. Verify Gemini response appears in chat
5. Test other stages: "Next Step" and "Full Solution"
6. Try different grades and problems
7. Check chat history saves correctly
8. Build production: `npm run build`

---

## 🔐 Security Notes

- API key stored in `.env` (never committed to git)
- Server-side API calls only (key never exposed to frontend)
- CORS configured for localhost development
- Update CORS for production deployment

---

## 📞 Support

For API key issues:
- Check quota: https://console.cloud.google.com
- API docs: https://ai.google.dev
- Restart backend after any .env change
