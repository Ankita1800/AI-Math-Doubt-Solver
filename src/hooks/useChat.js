import { useState, useCallback } from 'react';
import { askGemini } from '../api/gemini';

export function useChat() {
  const [grade, setGrade] = useState('Grade 9-10');
  const [problem, setProblem] = useState('');
  const [currentProblem, setCurrentProblem] = useState('');
  const [messages, setMessages] = useState([]);
  const [currentStage, setCurrentStage] = useState('idle'); // idle, hint, nextStep, solution
  const [isLoading, setIsLoading] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const addMessage = useCallback((role, text, stage = null) => {
    setMessages(prev => [...prev, { role, text, stage, id: Date.now() }]);
  }, []);

  const handleAsk = useCallback(async (problemText) => {
    if (!problemText.trim()) return;

    setIsLoading(true);
    setHasStarted(true);
    setCurrentProblem(problemText);
    setProblem('');

    // Add user message
    addMessage('user', problemText);

    try {
      // Get hint
      const hintText = await askGemini(problemText, grade, 'hint');
      addMessage('assistant', hintText, 'hint');
      setCurrentStage('hint');
    } catch (error) {
      console.error('Error fetching hint:', error);
      addMessage('assistant', 'Sorry, I encountered an error. Please try again.', 'error');
      setCurrentStage('error');
    } finally {
      setIsLoading(false);
    }
  }, [grade, addMessage]);

  const handleNext = useCallback(async (stage) => {
    if (!currentProblem) return;

    setIsLoading(true);

    try {
      if (stage === 'hint') {
        // Get next step
        const nextStepText = await askGemini(currentProblem, grade, 'nextStep');
        addMessage('assistant', nextStepText, 'nextStep');
        setCurrentStage('nextStep');
      } else if (stage === 'nextStep') {
        // Get full solution
        const solutionText = await askGemini(currentProblem, grade, 'solution');
        addMessage('assistant', solutionText, 'solution');
        setCurrentStage('solution');
      }
    } catch (error) {
      console.error('Error fetching next stage:', error);
      addMessage('assistant', 'Sorry, I encountered an error. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  }, [currentProblem, grade, addMessage]);

  const handleReset = useCallback(() => {
    setGrade('Grade 9-10');
    setProblem('');
    setCurrentProblem('');
    setMessages([]);
    setCurrentStage('idle');
    setIsLoading(false);
    setHasStarted(false);
  }, []);

  return {
    grade,
    setGrade,
    problem,
    setProblem,
    currentProblem,
    messages,
    currentStage,
    isLoading,
    hasStarted,
    handleAsk,
    handleNext,
    handleReset,
    addMessage,
  };
}
