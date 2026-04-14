import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend server is running' });
});

// Main Gemini API endpoint
app.post('/api/ask-gemini', async (req, res) => {
  try {
    const { problem, grade, stage } = req.body;

    if (!problem || !grade || !stage) {
      return res.status(400).json({
        error: 'Missing required fields: problem, grade, stage',
      });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({
        error: 'GEMINI_API_KEY is not configured. Please set it in .env file',
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

    // Try gemini-1.5-flash first, fallback to gemini-pro
    let endpoint = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    let modelName = 'gemini-1.5-flash';
    
    const response = await fetch(`${endpoint}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: fullPrompt }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024,
          topP: 0.95,
        },
      }),
    });

    // If 1.5-flash fails, try gemini-pro
    if (!response.ok && response.status === 404) {
      console.warn('gemini-1.5-flash not available, trying gemini-pro...');
      endpoint = 'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent';
      modelName = 'gemini-pro';
      
      const response2 = await fetch(`${endpoint}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: fullPrompt }],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 1024,
            topP: 0.95,
          },
        }),
      });
      
      if (!response2.ok) {
        const errorData = await response2.text();
        console.error(`${modelName} API error (${response2.status}):`, errorData);
        return res.status(response2.status).json({
          error: `Gemini API error: ${errorData}`,
        });
      }

      const data = await response2.json();
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        const text = data.candidates[0].content.parts[0].text;
        return res.json({ content: text });
      }

      return res.status(500).json({
        error: 'Unexpected response format from Gemini API',
        data: data,
      });
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error(`Gemini API error (${response.status}):`, errorData);
      return res.status(response.status).json({
        error: `Gemini API error: ${errorData}`,
      });
    }

    const data = await response.json();

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const text = data.candidates[0].content.parts[0].text;
      return res.json({ content: text });
    }

    return res.status(500).json({
      error: 'Unexpected response format from Gemini API',
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
  if (!GEMINI_API_KEY) {
    console.warn('⚠️  GEMINI_API_KEY not set in .env file');
  }
});
