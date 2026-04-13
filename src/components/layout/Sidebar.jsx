import { motion } from 'framer-motion';
import { X, MessageSquare, HelpCircle, Settings } from 'lucide-react';
import { GradeSelectorPills } from '../ui/GradeSelectorPills';
import { useAppStore } from '../../store/appStore';

const MENU_ITEMS = [
  { id: 'solver', icon: MessageSquare, label: 'Math Solver', active: true },
  { id: 'how-it-works', icon: HelpCircle, label: 'How It Works' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -260 }}
        animate={isOpen ? { x: 0 } : { x: -260 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
        className={`
          fixed md:relative
          left-0 top-0
          w-64 h-screen
          bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
          border-r border-slate-800
          overflow-y-auto scrollbar-thin
          z-40 md:z-auto
          flex flex-col
          translate-x-0 md:translate-x-0
        `}
        style={{
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Header */}
        <motion.div 
          className="p-6 border-b border-slate-800 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-sm font-bold text-white">𝓜</span>
              </motion.div>
              <div>
                <p className="text-sm font-bold text-white">MathMind</p>
                <p className="text-xs text-slate-500">AI Tutor</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </motion.div>

        {/* Menu */}
        <motion.nav 
          className="p-4 space-y-2 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {MENU_ITEMS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + idx * 0.05 }}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-200
                  ${
                    item.active
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                      : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                  }
                `}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </motion.nav>

        {/* Grade Selector */}
        <motion.div 
          className="px-4 py-6 border-t border-slate-800 flex-shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          <GradeSelectorPills />
        </motion.div>

        {/* History Section */}
        <motion.div 
          className="flex-1 px-4 py-6 border-t border-slate-800 overflow-y-auto min-h-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">
            Recent Problems
          </h3>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-xs text-slate-500">No history yet</p>
            <p className="text-xs text-slate-600 mt-1">Start solving!</p>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 text-center">
          <p className="text-xs text-slate-500 italic">
            Hints first.<br />Answers later.
          </p>
        </div>
      </motion.div>
    </>
  );
}
