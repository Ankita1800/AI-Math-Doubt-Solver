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
  const { sidebarOpen } = useAppStore();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={isOpen ? { x: -260 } : { x: 0 }}
        animate={isOpen ? { x: 0 } : { x: -260 }}
        transition={{ duration: 0.3 }}
        className={`
          fixed md:relative md:translate-x-0
          left-0 top-0
          w-64 h-screen
          bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
          border-r border-slate-800
          overflow-y-auto
          z-40 md:z-0
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-lg font-bold text-white">MathMind</span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="md:hidden p-2 hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-slate-400">AI Tutor</p>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
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
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>

        {/* Grade Selector */}
        <div className="px-4 py-6 border-t border-slate-800">
          <GradeSelectorPills />
        </div>

        {/* History Section */}
        <div className="flex-1 px-4 py-6 border-t border-slate-800 overflow-y-auto">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
            Recent Problems
          </h3>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-xs text-slate-500">No history yet</p>
            <p className="text-xs text-slate-600 mt-1">Start by solving a problem</p>
          </div>
        </div>

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
