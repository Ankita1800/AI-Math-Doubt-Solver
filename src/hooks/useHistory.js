import { useState, useCallback, useEffect } from 'react';

const HISTORY_KEY = 'mathmind_history';
const MAX_HISTORY = 5;

export function useHistory() {
  const [history, setHistory] = useState([]);

  // Load history from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading history:', error);
        setHistory([]);
      }
    }
  }, []);

  const addToHistory = useCallback((problem, grade) => {
    setHistory(prev => {
      const newHistory = [
        { problem, grade, timestamp: new Date().toLocaleString() },
        ...prev,
      ].slice(0, MAX_HISTORY);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  }, []);

  const getHistory = useCallback(() => history, [history]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return {
    history,
    addToHistory,
    getHistory,
    clearHistory,
  };
}
