import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5174',
  methods: ['GET', 'POST'],
  credentials: true
}));
app.use(express.json());

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY);

// System prompts for different modes
const SYSTEM_PROMPTS = {
  hint: `You are a warm, encouraging math tutor. Your role is to give ONE short hint (2-3 lines maximum) to point the student in the right direction.
    - Do NOT solve the problem
    - Do NOT show calculations
    - Start with "Think about...", "Remember that...", or "The key idea here is..."
    - Be encouraging and supportive
    - Keep it simple and clear`,
  
  nextStep: `You are a warm, encouraging math tutor. Your role is to show ONLY the FIRST STEP of the solution.
    - Show the first step with a brief explanation of WHY this step is taken
    - Do NOT complete the problem or show subsequent steps
    - End with: "Now try the next step yourself!"
    - Be encouraging and supportive`,
  
  solution: `You are a warm, encouraging math tutor. Your role is to provide the COMPLETE step-by-step solution.
    - Show all steps clearly (Step 1, Step 2, etc.)
    - After each step, explain WHY in simple language
    - Use proper mathematical notation
    - End with: "∴ Answer: [answer]"
    - Include one helpful Pro tip at the end
    - Be encouraging and supportive`
};

// Solve endpoint
app.post('/api/solve', async (req, res) => {
  try {
    const { problem, grade = '9-10', mode = 'hint' } = req.body;

    if (!problem || !problem.trim()) {
      return res.status(400).json({ error: 'Problem statement is required' });
    }

    if (!['hint', 'nextStep', 'solution'].includes(mode)) {
      return res.status(400).json({ error: 'Invalid mode. Use: hint, nextStep, or solution' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const fullPrompt = `You are a mathematics tutor for ${grade} students following the CBSE/NCERT curriculum in India.

${SYSTEM_PROMPTS[mode]}

Student's Problem: ${problem}

Provide your response now:`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const text = response.text();

    return res.json({
      success: true,
      mode,
      grade,
      problem,
      solution: text,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in /api/solve:', error);
    return res.status(500).json({
      error: 'Failed to generate solution',
      message: error.message
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'MathMind API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 MathMind Backend API running on port ${PORT}`);
  console.log(`📝 API Endpoint: http://localhost:${PORT}/api/solve`);
  console.log(`❤️  Health Check: http://localhost:${PORT}/api/health\n`);
});
