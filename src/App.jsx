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

  const hasMessages = messages.length > 0;

  const content = (
    <div className="w-full flex flex-col overflow-hidden" style={{ height: '100%' }}>
      {/* Content Area - Changes based on state */}
      {!hasMessages ? (
        // ========== EMPTY STATE ==========
        // Centered layout with overflow scrolling if needed on small screens
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12 overflow-y-auto">
          {/* Main Container */}
          <div className="w-full max-w-4xl flex flex-col items-center">
            {/* Heading Section */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12 w-full"
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-white leading-tight">
                What do you want to solve today?
              </h2>
              <p className="text-gray-500 text-base sm:text-lg md:text-lg font-medium">
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
              <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4 text-center">
                Explore Topics
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-2">
                <TopicChips onSelect={handleTopicSelect} />
              </div>
            </motion.div>
          </div>
        </div>
      ) : (
        // ========== ACTIVE CHAT STATE ==========
        // Scrollable messages
        <div className="flex-1 overflow-y-auto">
          <div className="w-full max-w-2xl mx-auto px-4 py-6">
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
        </div>
      )}

      {/* Input Area - Always visible at bottom */}
      {hasMessages && (
        <div className="shrink-0 border-t border-gray-900 bg-black px-4 md:px-6 py-3">
          <div className="w-full max-w-2xl mx-auto flex items-center justify-center gap-2 sm:gap-3 mb-3">
            <ActionButtons onSelect={handleActionSelect} />
          </div>
        </div>
      )}
      
      <div className="shrink-0 border-t border-gray-900 bg-black p-4 md:p-6">
        <div className="w-full max-w-2xl mx-auto">
          <ProblemInput
            problem={problem}
            setProblem={setProblem}
            onSubmit={() => handleSolve(problem)}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );

  return <Layout>{content}</Layout>;
}

