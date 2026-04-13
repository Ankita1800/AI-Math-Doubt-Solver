# MathMind AI - Premium AI Math Tutor

A modern, production-level AI Math Tutor web application built with React, Vite, Tailwind CSS, and Framer Motion. Features a dark theme with glassmorphism design, smooth animations, and professional typography.

## 🎨 Features

### Frontend
- ✨ **Modern Dark Theme**: Gradient backgrounds with glassmorphism effects
- 🎭 **Smooth Animations**: Framer Motion for fluid micro-interactions
- 📱 **Fully Responsive**: Mobile-first design that works on all devices
- 🔮 **Beautiful UI Components**: Rounded cards (2xl), soft shadows, subtle borders
- 🎯 **Three Solving Modes**: Hint, Next Step, Full Solution
- 📚 **Topic Exploration**: Quick access to common math topics
- 💬 **Chat Interface**: Real-time problem solving with typing animations
- 🧮 **Math Rendering**: KaTeX support for beautiful mathematical expressions

### Backend
- 🚀 **Express.js API**: Fast, lightweight backend server
- 🤖 **Google Gemini Integration**: Powered by cutting-edge AI
- 📊 **Three Solution Modes**: Adaptive responses based on learning mode
- 🎓 **Context-Aware**: Tailored for Indian CBSE/NCERT curriculum
- 🔒 **Secure API**: Environment variable management for API keys

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI framework
- **Vite** - Lightning-fast build tool
- **Tailwind CSS 4** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **Zustand** - State management
- **KaTeX** - Math equation rendering

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **@google/generative-ai** - Gemini API client
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment configuration

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm 8+
- A Google Gemini API key (free from https://ai.google.dev)

### Frontend Setup

```bash
cd "e:\AI Math Doubt Solver"
npm install --legacy-peer-deps
cp .env.example .env
# Add your Gemini API key to .env: VITE_GEMINI_API_KEY=your_api_key_here
npm run dev
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Add your Gemini API key to backend/.env
npm run dev
```

## 🚀 Usage

Start both frontend and backend:

**Terminal 1 - Frontend (http://localhost:5174):**
```bash
npm run dev
```

**Terminal 2 - Backend (http://localhost:5000):**
```bash
cd backend && npm run dev
```

## 📡 API Endpoints

### POST `/api/solve`
Solve a math problem with specified mode.

### GET `/api/health`
Health check endpoint.

## 🔐 Environment Variables

### Frontend (.env)
```
VITE_GEMINI_API_KEY=your_api_key_here
```

### Backend (.env)
```
VITE_GEMINI_API_KEY=your_api_key_here
PORT=5000
NODE_ENV=development
```

## 🎨 Design System

**Colors**: Purple (#6366f1) → Pink, Dark background (Slate-950)
**Components**: 2xl rounded cards, glassmorphism effects, smooth animations
**Typography**: Bold headings with gradient text, professional body text

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px  
- Desktop: > 1024px

## 🚀 Build & Deploy

```bash
npm run build
cd backend && npm start
```
