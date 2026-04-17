const API_BASE_URL = 'http://localhost:5002/api';

export async function solveProblem(problem, grade = 'Grade 9-10', mode = 'hint') {
  try {
    const response = await fetch(`${API_BASE_URL}/ask-gemini`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        problem,
        grade,
        stage: mode, // Backend expects 'stage', not 'mode'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      solution: data.content, // Extract content from Groq response
    };
  } catch (error) {
    console.error('Error calling solve API:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Error checking API health:', error);
    return false;
  }
}
