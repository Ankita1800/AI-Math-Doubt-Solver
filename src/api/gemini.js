// API key from environment variable - set in .env file
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export async function askGemini(problem, grade, stage) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/ask-gemini`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        problem,
        grade,
        stage,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `API Error: ${response.status}`);
    }

    const data = await response.json();
    return {
      content: data.content,
      type: 'math',
    };
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    throw error;
  }
}