import { useState, useCallback } from 'react';
import { solveProblem } from '../api/backend';

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
      const result = await solveProblem(problemText, grade, 'hint');
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to get hint');
      }
      
      addMessage('assistant', result.solution, 'hint');
      setCurrentStage('hint');
    } catch (error) {
      console.error('Error fetching hint:', error);
      addMessage('assistant', `Sorry, I encountered an error: ${error.message}. Please try again.`, 'error');
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
        const result = await solveProblem(currentProblem, grade, 'nextStep');
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to get next step');
        }
        
        addMessage('assistant', result.solution, 'nextStep');
        setCurrentStage('nextStep');
      } else if (stage === 'nextStep') {
        // Get full solution
        const result = await solveProblem(currentProblem, grade, 'solution');
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to get solution');
        }
        
        addMessage('assistant', result.solution, 'solution');
        setCurrentStage('solution');
      }
    } catch (error) {
      console.error('Error fetching next stage:', error);
      addMessage('assistant', `Sorry, I encountered an error: ${error.message}. Please try again.`, 'error');
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
