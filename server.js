import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GROQ_API_KEY = process.env.GROQ_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// Main Groq API endpoint (OpenAI-compatible)
app.post('/api/ask-gemini', async (req, res) => {
  try {
    const { problem, grade, stage } = req.body;

    if (!problem || !grade || !stage) {
      return res.status(400).json({
        error: 'Missing required fields: problem, grade, stage',
      });
    }

    if (!GROQ_API_KEY) {
      return res.status(500).json({
        error: 'GROQ_API_KEY is not configured. Please set it in .env file',
      });
    }

    const stagePrompts = {
      hint: `Give ONE short hint (2-3 lines only) to point the student in the right direction. Do NOT solve anything. Do NOT show calculations. Start with "Think about..." or "Remember that..." or "The key idea here is..."`,
      nextStep: `Show only the FIRST STEP of the actual solution with a brief explanation of WHY this step is taken. Do not complete the problem. End with: "Now try the next step yourself!"`,
      solution: `Show the COMPLETE step-by-step solution. Number each step (Step 1, Step 2...). After each step explain WHY in simple language. End with: "∴ Answer: [answer]" and one Pro tip.`,
    };

    const fullPrompt = `You are a warm, encouraging math tutor for a ${grade} student in India following CBSE/NCERT curriculum.
The student's problem is: ${problem}
Your task: ${stagePrompts[stage]}
Be friendly, clear, and concise.`;

    // Use Groq API with OpenAI-compatible format
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Currently available Groq model
        messages: [
          {
            role: 'system',
            content: 'You are a helpful math tutor. Provide clear, concise explanations.',
          },
          {
            role: 'user',
            content: fullPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 1024,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      return res.status(response.status).json({
        error: `Groq API error: ${errorText}`,
      });
    }

    const data = await response.json();

    if (data.choices && data.choices[0] && data.choices[0].message) {
      const text = data.choices[0].message.content;
      return res.json({ content: text });
    }

    return res.status(500).json({
      error: 'Unexpected response format from Groq API',
      data: data,
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/ask-gemini`);
  console.log(`🔑 Using Groq API for faster inference`);
  if (!GROQ_API_KEY) {
    console.warn('⚠️  GROQ_API_KEY not set in .env file');
  }
});
