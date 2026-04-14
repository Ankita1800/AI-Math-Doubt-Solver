# MathMind Backend Setup

## Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- A Google Gemini API key

## Getting Started

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Configure API Key
The backend needs your Google Gemini API key. It's already configured in the `.env` file.

To get a new API key:
1. Visit: https://makersuite.google.com/app/apikey
2. Copy your API key
3. Update `.env` file with: `GEMINI_API_KEY=your_key_here`

### 3. Running the Backend Server

**Option 1: Run backend only**
```bash
npm run start
# or
npm run dev:backend
```
Server will run on http://localhost:5000

**Option 2: Run backend + frontend together**
```bash
npm run dev:all
```
- Backend: http://localhost:5000
- Frontend: http://localhost:5173

**Option 3: Run frontend only (if backend is already running)**
```bash
npm run dev
```

## API Endpoints

### Health Check
```
GET http://localhost:5000/health
```

### Ask Gemini
```
POST http://localhost:5000/api/ask-gemini
Content-Type: application/json

{
  "problem": "Solve: 2x + 5 = 13",
  "grade": "Grade 9-10",
  "stage": "hint" | "nextStep" | "solution"
}
```

**Response:**
```json
{
  "content": "The AI's response here..."
}
```

## Troubleshooting

**Error: "GEMINI_API_KEY is not configured"**
- Make sure `.env` file exists and has `GEMINI_API_KEY` set

**Error: "Backend server is not running on port 5000"**
- Run: `npm run dev:backend`
- Make sure the port 5000 is not in use by another process

**Port 5000 already in use?**
- Change the PORT in `.env` file: `PORT=5001`
- Or kill the process using port 5000

## Environment Variables

```env
# Required
GEMINI_API_KEY=your_api_key_here

# Optional
PORT=5000  # Default is 5000
```

## Development

The backend is built with:
- **Express.js** - Web framework
- **CORS** - Cross-origin requests
- **dotenv** - Environment variables

## Production

To run in production:
```bash
npm run build
npm start
```

---

**Need help?** Check the .env file to ensure your API key is configured correctly.
