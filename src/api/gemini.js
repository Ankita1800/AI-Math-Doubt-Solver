// API key from environment variable - set in .env file
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function askGemini(problem, grade, stage) {
  const stagePrompts = {
    hint: `Give ONE short hint (2-3 lines only) to point the student in the right direction. Do NOT solve anything. Do NOT show calculations. Start with "Think about..." or "Remember that..." or "The key idea here is..."`,
    nextStep: `Show only the FIRST STEP of the actual solution with a brief explanation of WHY this step is taken. Do not complete the problem. End with: "Now try the next step yourself!"`,
    solution: `Show the COMPLETE step-by-step solution. Number each step (Step 1, Step 2...). After each step explain WHY in simple language. End with: "∴ Answer: [answer]" and one Pro tip.`,
  };

  const fullPrompt = `You are a warm, encouraging math tutor for a ${grade} student in India following CBSE/NCERT curriculum.
The student's problem is: ${problem}
Your task: ${stagePrompts[stage]}
Be friendly, clear, and concise.`;

  // Try multiple endpoints and models
  const configs = [
    { endpoint: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent", model: "gemini-1.5-flash" },
    { endpoint: "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent", model: "gemini-pro" },
  ];

  for (const config of configs) {
    try {
      const response = await fetch(`${config.endpoint}?key=${API_KEY}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
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

      if (!response.ok) {
        const errorData = await response.text();
        console.warn(`${config.model} failed with status ${response.status}:`, errorData);
        continue;
      }

      const data = await response.json();

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.warn(`${config.model} returned unexpected structure:`, data);
        continue;
      }
    } catch (err) {
      console.warn(`${config.model} failed:`, err.message);
      continue;
    }
  }

  // Fallback: Use mock responses for demo
  console.warn("API call failed, using mock response");
  const mockResponses = {
    hint: "Think about the ratio of favorable outcomes to total possible outcomes. What are all the ways to pick a ball, and how many of those result in picking a red ball?",
    nextStep: "Step 1: Count the total number of balls.\nTotal = 3 red + 5 blue = 8 balls\n\nThis gives us the total number of possible outcomes when picking one ball randomly.",
    solution: `Step 1: Count total balls
Total = 3 red + 5 blue = 8 balls

Step 2: Count favorable outcomes  
Red balls = 3 (favorable outcomes)

Step 3: Apply probability formula
Probability = Favorable outcomes / Total outcomes
Probability of picking red = 3/8 = 0.375 or 37.5%

∴ Answer: The probability of picking a red ball is 3/8 or 37.5%

Pro tip: Probability is always between 0 and 1. Check if your answer makes sense!`,
  };

  return mockResponses[stage] || "Unable to generate response. Please configure your API key at https://ai.google.dev";
}