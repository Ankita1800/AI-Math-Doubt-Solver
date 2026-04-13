import { motion } from 'framer-motion';
import { X, MessageSquare, HelpCircle, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { GradeSelectorPills } from '../ui/GradeSelectorPills';
import { useAppStore } from '../../store/appStore';

const MENU_ITEMS = [
  { id: 'solver', icon: MessageSquare, label: 'Math Solver', active: true },
  { id: 'how-it-works', icon: HelpCircle, label: 'How It Works' },
  { id: 'settings', icon: Settings, label: 'Settings' },
];

export function Sidebar({ isOpen, onClose, isCollapsed = false, onToggleCollapse, isMobile = false }) {
  return (
    <>
      {/* Desktop Sidebar Container */}
      {!isMobile && (
        <div
          className="w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
          border-r border-slate-800 overflow-hidden flex flex-col transition-all duration-300"
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between gap-2 flex-shrink-0 min-w-0">
            {!isCollapsed && (
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-white">M</span>
                </div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-w-0"
                >
                  <p className="text-sm font-bold text-white truncate">MathMind</p>
                  <p className="text-xs text-slate-400 truncate">AI Tutor</p>
                </motion.div>
              </div>
            )}
            {isCollapsed && (
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-lg font-bold text-white">M</span>
              </div>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onToggleCollapse}
              className="p-1 hover:bg-slate-800 rounded-lg transition flex-shrink-0"
              title={isCollapsed ? 'Expand' : 'Collapse'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </motion.button>
          </div>

          {/* Menu */}
          <nav className="p-2 space-y-1 min-w-0 flex-shrink-0">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: isCollapsed ? 0 : 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    w-full flex items-center gap-2 px-3 py-2 rounded-xl
                    transition-all duration-200 flex-shrink-0 min-w-0
                    ${
                      item.active
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-500/30'
                        : 'text-slate-400 hover:text-slate-300 hover:bg-slate-800/50'
                    }
                  `}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-sm font-medium truncate flex-shrink-0"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Grade Selector */}
          <div className={`${isCollapsed ? 'px-2 py-4' : 'px-3 py-4'} border-t border-slate-800`}>
            {!isCollapsed && (
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                Current Grade
              </p>
            )}
            <GradeSelectorPills isCompact={isCollapsed} />
          </div>

          {/* History Section */}
          <div className="flex-1 border-t border-slate-800 overflow-y-auto min-w-0">
            {!isCollapsed && (
              <div className="p-3">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
                  Recent Problems
                </h3>
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <p className="text-xs text-slate-500">No history yet</p>
                  <p className="text-xs text-slate-600 mt-1">Start solving</p>
                </div>
              </div>
            )}
            {isCollapsed && (
              <div className="p-2 flex items-center justify-center py-8">
                <div className="w-8 h-8 rounded-lg bg-slate-800/50 flex items-center justify-center">
                  <p className="text-xs text-slate-600">-</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-3 border-t border-slate-800 text-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-slate-500 italic"
              >
                Hints first.<br />Answers later.
              </motion.p>
            </div>
          )}
        </div>
      )}

      {/* Mobile Sidebar Container */}
      {isMobile && (
        <div
          className={`w-full h-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950
          border-r border-slate-800 overflow-y-auto flex flex-col`}
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-lg font-bold text-white">M</span>
              </div>
              <div>
                <p className="text-sm font-bold text-white">MathMind</p>
                <p className="text-xs text-slate-400">AI Tutor</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-2 hover:bg-slate-800 rounded-lg transition"
            >
              <X className="w-5 h-5 text-slate-300" />
            </motion.button>
          </div>

          {/* Menu */}
          <nav className="p-4 space-y-2">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
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
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Current Grade
            </p>
            <GradeSelectorPills />
          </div>

          {/* History Section */}
          <div className="flex-1 px-4 py-6 border-t border-slate-800 overflow-y-auto">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">
              Recent Problems
            </h3>
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <p className="text-xs text-slate-500">No history yet</p>
              <p className="text-xs text-slate-600 mt-1">Start solving</p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-slate-800 text-center">
            <p className="text-xs text-slate-500 italic">
              Hints first.<br />Answers later.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
