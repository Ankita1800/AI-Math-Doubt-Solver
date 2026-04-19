import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Get allowed origins from environment or use defaults
const allowedOrigins = [
  'http://localhost:5173', // Local dev
  'http://localhost:3000',  // Alternate local dev
  process.env.FRONTEND_URL, // Vercel/production frontend URL
].filter(Boolean);

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
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

app.use(express.json());

// Validate API Key
const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;
if (!NVIDIA_API_KEY) {
  console.error('ERROR: NVIDIA_API_KEY environment variable is not set');
  process.exit(1);
}

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

/**
 * POST /api/solve
 * Solve a math problem using Gemini API
 */
app.post('/api/solve', async (req, res) => {
  try {
    const { problem, grade = '9-10', mode = 'hint' } = req.body;

    // Validate input
    if (!problem || !problem.trim()) {
      return res.status(400).json({ 
        success: false,
        error: 'Problem statement is required' 
      });
    }

    if (!['hint', 'nextStep', 'solution'].includes(mode)) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid mode. Use: hint, nextStep, or solution' 
      });
    }

    // Build prompt
    const systemPrompt = SYSTEM_PROMPTS[mode] || SYSTEM_PROMPTS.hint;
    const fullPrompt = `You are a mathematics tutor for ${grade} students following the CBSE/NCERT curriculum in India.

${systemPrompt}

Student's Problem: ${problem}

Provide your response now:`;

    // Call NVIDIA NIM API via Axios
    const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
    const payload = {
      model: "google/gemma-4-31b-it",
      messages: [{ role: "user", content: fullPrompt }],
      max_tokens: 1024,
      temperature: 0.2,
      top_p: 0.95,
      stream: false,
      chat_template_kwargs: { enable_thinking: true }
    };

    const response = await axios.post(invokeUrl, payload, {
      headers: {
        "Authorization": `Bearer ${NVIDIA_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    });
    
    const text = response.data.choices[0]?.message?.content || '';

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
    
    // Handle specific API errors
    let errorMessage = error.message || 'Failed to generate solution';
    
    if (error.message?.includes('API_KEY')) {
      errorMessage = 'API key error - please check backend configuration';
    } else if (error.message?.includes('quota')) {
      errorMessage = 'API quota exceeded - please try again later';
    }

    return res.status(500).json({
      success: false,
      error: 'Failed to generate solution',
      message: errorMessage
    });
  }
});

/**
 * GET /api/health
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'MathMind API is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * GET /
 * Root endpoint - API info
 */
app.get('/', (req, res) => {
  res.json({ 
    name: 'MathMind Backend API', 
    version: '1.0.0',
    endpoints: {
      solve: 'POST /api/solve',
      health: 'GET /api/health'
    },
    status: 'operational'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    path: req.path
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  
  // CORS errors
  if (err.message === 'CORS not allowed') {
    return res.status(403).json({ 
      error: 'CORS error',
      message: 'This origin is not allowed to access this API'
    });
  }

  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'An error occurred'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n MathMind Backend API running on port ${PORT}`);
  console.log(`API Endpoint: http://localhost:${PORT}/api/solve`);
  console.log(`Health Check: http://localhost:${PORT}/api/health`);
  console.log(`Allowed Origins:`, allowedOrigins);
  console.log(`NVIDIA NIM API: ${NVIDIA_API_KEY ? 'Connected' : 'ERROR'}\n`);
});
