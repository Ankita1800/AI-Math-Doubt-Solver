import { create } from 'zustand';

export const useAppStore = create((set) => ({
  // UI State
  grade: '9-10',
  setGrade: (grade) => set({ grade }),
  
  currentMode: 'hint', // 'hint', 'nextStep', 'solution'
  setCurrentMode: (mode) => set({ currentMode: mode }),
  
  sidebarOpen: false,
  setSidebarOpen: (isOpen) => set({ sidebarOpen: isOpen }),
  
  // Chat State
  messages: [],
  addMessage: (role, content, type = 'text') =>
    set((state) => ({
      messages: [...state.messages, { role, content, type, id: Date.now() }],
    })),
  
  clearMessages: () => set({ messages: [] }),
  
  // Problem State
  currentProblem: null,
  setCurrentProblem: (problem) => set({ currentProblem: problem }),
  
  // Loading State
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  // History State
  history: [],
  addToHistory: (problem) =>
    set((state) => ({
      history: [
        { ...problem, timestamp: Date.now(), id: Date.now() },
        ...state.history,
      ].slice(0, 20), // Keep last 20
    })),
  
  // Settings State
  theme: 'dark',
  setTheme: (theme) => set({ theme }),
}));
