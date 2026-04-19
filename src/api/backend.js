const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

/**
 * Solve a math problem by calling the backend API
 * @param {string} problem - The math problem to solve
 * @param {string} grade - Student grade level
 * @param {string} mode - 'hint', 'nextStep', or 'solution'
 * @returns {Promise<{success: boolean, solution?: string, error?: string}>}
 */
export async function solveProblem(problem, grade = 'Grade 9-10', mode = 'hint') {
  try {
    if (!problem || !problem.trim()) {
      throw new Error('Problem statement is required');
    }

    const response = await fetch(`${API_BASE_URL}/api/solve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        problem: problem.trim(),
        grade,
        mode,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.success || !data.solution) {
      throw new Error('Invalid response format from API');
    }

    return {
      success: true,
      solution: data.solution,
    };
  } catch (error) {
    console.error('Error calling solve API:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch solution from API',
    };
  }
}

/**
 * Check if the backend API is healthy
 * @returns {Promise<boolean>}
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return response.ok;
  } catch (error) {
    console.error('Error checking API health:', error);
    return false;
  }
}
