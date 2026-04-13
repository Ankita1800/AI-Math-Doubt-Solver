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
    }} className="w-full max-w-2xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative group"
      >
        {/* Gradient background effect */}
        <div
          className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-300"
          style={{ zIndex: -1 }}
        />

        <div className="relative flex items-center gap-3 px-5 py-3 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-900 border border-slate-700 group-hover:border-slate-600 transition">
          <input
            type="text"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your math problem... (e.g., Solve: 2x² + 5x − 3 = 0)"
            className="flex-1 bg-transparent text-white placeholder-slate-500 focus:outline-none text-sm"
            disabled={isLoading}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading || !problem.trim()}
            className="
              p-2 rounded-lg
              bg-gradient-to-r from-purple-500 to-pink-500
              text-white font-semibold
              hover:shadow-lg hover:shadow-purple-500/50
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
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
