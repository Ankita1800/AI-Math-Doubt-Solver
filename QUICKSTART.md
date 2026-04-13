# 🚀 MathMind AI - Quick Start Guide

## What's New? ✨

Your project has been completely rebuilt into a **production-level modern AI Math Tutor** with:

- **Premium Dark UI** with glassmorphism and smooth animations
- **Three Learning Modes**: Hint → Next Step → Full Solution
- **Real-time Chat Interface** with KaTeX math rendering
- **Express.js Backend** with Gemini API integration
- **Fully Responsive** (Mobile, Tablet, Desktop)
- **Beautiful Micro-interactions** using Framer Motion

---

## 🎯 Quick Start (5 minutes)

### Step 1: Get API Key
1. Go to https://ai.google.dev
2. Click "Get API Key"
3. Create a new API key
4. Copy the key

### Step 2: Frontend Setup
```bash
# Navigate to project
cd "e:\AI Math Doubt Solver"

# Install dependencies (if not done)
npm install --legacy-peer-deps

# Create .env and add your API key
echo VITE_GEMINI_API_KEY=your_key_here > .env

# Start frontend
npm run dev
```

**Access Frontend:** http://localhost:5174

### Step 3: Backend Setup
```bash
# In a new terminal
cd "e:\AI Math Doubt Solver\backend"

# Install dependencies (if not done)
npm install

# Create .env and add your API key
echo VITE_GEMINI_API_KEY=your_key_here > .env

# Start backend
npm run dev
```

**Backend runs on:** http://localhost:5000

---

## 🎨 Features Overview

### Home Screen
![Home](Blank with "What do you want to solve today?")

**Components:**
- **Action Cards** (3 buttons): Hint | Next Step | Full Solution
- **Topic Chips** (12 topics): Quadratic, Trigonometry, etc.
- **Problem Input**: Beautiful gradient input field

### Sidebar
- Grade selector (5-6, 7-8, 9-10, 11-12)
- Navigation menu
- Recent problems history
- Brand logo

### Chat Interface
- Real-time responses
- Copy to clipboard
- Save problems
- Smooth animations
- Math equation rendering

---

## 📁 Project Structure

```
AI Math Doubt Solver/
├── src/
│   ├── App.jsx                 # Main app
│   ├── index.css              # Tailwind styles
│   ├── main.jsx               # Entry point
│   ├── api/
│   │   ├── gemini.js          # Direct Gemini API (optional)
│   │   └── backend.js         # Backend API calls
│   ├── store/
│   │   └── appStore.js        # Zustand state management
│   ├── components/
│   │   ├── ActionCard.jsx     # Hint/Next/Solution buttons
│   │   ├── ChatMessage.jsx    # Chat bubbles
│   │   ├── ProblemInput.jsx   # Input field
│   │   ├── TopicChips.jsx     # Topic buttons
│   │   ├── layout/
│   │   │   └── Sidebar.jsx    # Navigation sidebar
│   │   └── ui/
│   │       ├── MathRenderer.jsx   # KaTeX rendering
│   │       └── GradeSelectorPills.jsx
│   └── hooks/
│       ├── useChat.js
│       └── useHistory.js
├── backend/
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env.example
├── package.json
├── vite.config.js
└── README.md
```

---

## 🔧 Key Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.4 | UI Framework |
| Vite | 8.0+ | Build tool (lightning fast) |
| Tailwind CSS | 4.2 | Styling (utility-first) |
| Framer Motion | 11.0 | Animations |
| Lucide React | 0.294 | Icons |
| Zustand | 4.4 | State management |
| KaTeX | 0.16 | Math rendering |
| Express | 4.18 | Backend API |
| @google/generative-ai | 0.3 | Gemini AI |

---

## 🎯 How It Works

### User Flow
1. User opens app → **Home screen** with three action cards
2. Selects mode: **Hint** / **Next Step** / **Full Solution**
3. Types problem → **Presses Send**
4. Backend calls **Gemini API** with appropriate prompt
5. Response rendered in **chat interface**
6. Can **change mode** and re-solve

### API Flow
```
Frontend → Backend → Gemini API → Backend → Frontend
          (Express)               (JSON)
```

### Behind the Scenes (Example)
```
Input: "Solve: 2x² + 5x − 3 = 0"
Mode: "hint"

↓

System Prompt: "Give ONE short hint (2-3 lines only)..."
Gemini Response: "Think about the quadratic formula..."
User See: Beautiful message in chat

↓

Can switch to "nextStep" or "solution"
```

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Upload dist/ folder
```

### Backend (Railway/Heroku)
```bash
cd backend
npm start
```

---

## 🐛 Troubleshooting

### "Backend not running" Error?
- Check: Is backend running on port 5000?
- Run: `cd backend && npm run dev`

### "API key invalid" Error?
- Check: Is VITE_GEMINI_API_KEY in .env?
- Try: Getting a new key from https://ai.google.dev

### Database errors?
- No database needed! Everything is API-based

### Port already in use?
- Frontend: Try port 5175 (Vite auto-switches)
- Backend: Change `PORT=5001` in backend/.env

---

## 📊 Architecture

```
┌─────────────────────────────────────────┐
│         React + Vite (Frontend)         │
│   React 19 | Tailwind | Framer Motion   │
│     Zustand | KaTeX | Lucide React      │
└──────────────────────┬──────────────────┘
                       │ HTTP/CORS
              ┌────────▼────────┐
              │  Express.js     │
              │   (Backend API) │
              │  Port: 5000     │
              └────────┬────────┘
                       │
              ┌────────▼────────┐
              │ Google Gemini   │
              │ Generative AI   │
              └─────────────────┘
```

---

## 💡 Tips & Tricks

### Change Gradient Colors
Edit `src/App.jsx` and `src/components/ActionCard.jsx` to modify color schemes

### Add More Topics
Edit `src/components/TopicChips.jsx` TOPICS array

### Customize Prompts
Edit `backend/server.js` SYSTEM_PROMPTS object

### Adjust Animations
Modify `duration` and `delay` in Framer Motion components

---

## 📝 Next Steps

1. **Test the app** at http://localhost:5174
2. **Try different modes** (Hint, Next Step, Solution)
3. **Explore responsive design** on mobile view
4. **Deploy** to production (Vercel + Railway)
5. **Celebrate** 🎉

---

## 📞 Support

- Check backend logs if something fails
- Verify API key is correct
- Make sure both frontend and backend are running
- Check CORS settings if getting API errors

---

## 🎉 You're All Set!

Your modern MathMind AI tutor is ready to go! 

**Happy Math Tutoring!** 🧮✨
