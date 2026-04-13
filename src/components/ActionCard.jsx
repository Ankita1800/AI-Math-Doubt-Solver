import { motion } from 'framer-motion';
import { Lightbulb, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';

const ACTIONS = [
  {
    id: 'hint',
    label: 'Hint',
    description: 'Get a clue',
    icon: Lightbulb,
    gradient: 'from-amber-500 to-orange-500',
    darkGradient: 'from-amber-400 to-orange-400',
  },
  {
    id: 'nextStep',
    label: 'Next Step',
    description: 'First step shown',
    icon: ChevronRight,
    gradient: 'from-blue-500 to-cyan-500',
    darkGradient: 'from-blue-400 to-cyan-400',
  },
  {
    id: 'solution',
    label: 'Full Solution',
    description: 'Complete answer',
    icon: CheckCircle2,
    gradient: 'from-green-500 to-emerald-500',
    darkGradient: 'from-green-400 to-emerald-400',
  },
];

export function ActionButtons({ onSelect }) {
  const { currentMode } = useAppStore();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full">
      {ACTIONS.map((action, index) => {
        const Icon = action.icon;
        const isActive = currentMode === action.id;

        return (
          <motion.button
            key={action.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.05, translateY: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(action.id)}
            className={`
              relative group
              w-full sm:w-32 md:w-36
              p-4 rounded-2xl overflow-hidden
              transition-all duration-300
              ${
                isActive
                  ? 'bg-gradient-to-br ' + action.darkGradient + ' shadow-lg shadow-' + action.gradient.split(' ')[1]
                  : 'bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700'
              }
              hover:shadow-lg hover:border-slate-600
              flex flex-col items-center justify-center gap-2
            `}
          >
            {/* Background glow effect */}
            <div
              className={`
                absolute inset-0 opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                bg-gradient-to-br ${action.darkGradient}
                blur-xl
              `}
              style={{ zIndex: -1 }}
            />

            {/* Content */}
            <div className="relative flex flex-col items-center gap-2 text-center">
              <motion.div
                animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                />
              </motion.div>

              <div>
                <h3 className={`font-semibold text-sm sm:text-base ${isActive ? 'text-white' : 'text-slate-200'}`}>
                  {action.label}
                </h3>
                <p className={`text-xs ${isActive ? 'text-white/80' : 'text-slate-400'}`}>
                  {action.description}
                </p>
              </div>

              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
