import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader } from 'lucide-react';

export default function ProblemInput({ problem, setProblem, onSubmit, isLoading }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (problem.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }} className="w-full flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative group w-full max-w-2xl px-4"
      >
        {/* Gradient background effect - removed */}
        <div
          className="absolute -inset-1 rounded-2xl blur opacity-0 group-hover:opacity-0 transition duration-300"
          style={{ zIndex: -1 }}
        />

        <div className="relative flex items-center gap-3 px-5 py-3 sm:py-4 rounded-2xl bg-gray-900 border border-gray-800 group-hover:border-gray-700 transition">
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your math problem... (e.g., Solve: 2x² + 5x − 3 = 0)"
            className="flex-1 bg-transparent text-white placeholder-gray-500 text-sm sm:text-base focus:outline-none"
            disabled={isLoading}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading || !problem.trim()}
            className="
              p-2 sm:p-2.5 rounded-lg
              bg-white text-black
              font-semibold
              hover:shadow-lg hover:bg-gray-100
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
              flex-shrink-0
            "
          >
            {isLoading ? (
              <Loader className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </div>
      </motion.div>
    </form>
  );
}
