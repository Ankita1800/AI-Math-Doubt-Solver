import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Layout } from './components/layout/Layout';
import { ActionButtons } from './components/ActionCard';
import TopicChips from './components/TopicChips';
import ProblemInput from './components/ProblemInput';
import { ChatMessage } from './components/ChatMessage';
import { useAppStore } from './store/appStore';
import { solveProblem } from './api/backend';

export default function App() {
  const [problem, setProblem] = useState('');
  const { messages, addMessage, currentMode, setCurrentMode, grade, isLoading, setIsLoading, clearMessages } = useAppStore();

  const handleSolve = async (userProblem) => {
    if (!userProblem.trim()) return;

    // Add user message
    addMessage('user', userProblem);
    setProblem('');
    setIsLoading(true);

    try {
      const response = await solveProblem(userProblem, grade, currentMode);
      if (response.success) {
        addMessage('assistant', response.solution);
      } else {
        addMessage('assistant', `Error: ${response.error || 'Could not generate solution'}`);
      }
    } catch (error) {
      console.error('Error:', error);
      addMessage('assistant', 'Error: Could not process your request. Make sure the backend server is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicSelect = (topic) => {
    setProblem(`Solve a problem related to ${topic}`);
  };

  const handleActionSelect = (action) => {
    setCurrentMode(action);
    if (messages.length > 0) {
      // Re-solve with new mode
      const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
      if (lastUserMessage) {
        clearMessages();
        handleSolve(lastUserMessage.content);
      }
    }
  };

  const content = (
    <>
      {messages.length === 0 ? (
        // Home Screen - Perfectly Centered
        <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 py-8 md:py-12">
          {/* Main Container */}
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* Heading Section */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 w-full"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent leading-tight">
                What do you want to solve today?
              </h2>
              <p className="text-slate-400 text-base sm:text-lg md:text-lg font-medium">
                Hints first. Answers later. Learn the why.
              </p>
            </motion.div>

            {/* Action Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full mb-12"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                <ActionButtons onSelect={handleActionSelect} />
              </div>
            </motion.div>

            {/* Topics Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full mb-12"
            >
              <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4 text-center">
                Explore Topics
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2">
                <TopicChips onSelect={handleTopicSelect} />
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        // Chat Screen
        <div className="w-full max-w-2xl mx-auto px-4 py-6 pb-32">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && (
            <ChatMessage
              message={{ role: 'assistant', content: '', type: 'text' }}
              isLoading={true}
            />
          )}
        </div>
      )}

      {/* Input - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-transparent p-4 md:p-6 backdrop-blur flex justify-center z-20">
        <div className="w-full max-w-2xl">
          <ProblemInput
            problem={problem}
            setProblem={setProblem}
            onSubmit={() => handleSolve(problem)}
            isLoading={isLoading}
          />
        </div>
      </div>
    </>
  );

  return <Layout>{content}</Layout>;
}

