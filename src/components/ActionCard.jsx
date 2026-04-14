import { motion } from 'framer-motion';
import { Lightbulb, ChevronRight, CheckCircle2 } from 'lucide-react';
import { useAppStore } from '../store/appStore';

const ACTIONS = [
  {
    id: 'hint',
    label: 'Hint',
    description: 'Get a clue',
    icon: Lightbulb,
  },
  {
    id: 'nextStep',
    label: 'Next Step',
    description: 'First step shown',
    icon: ChevronRight,
  },
  {
    id: 'solution',
    label: 'Full Solution',
    description: 'Complete answer',
    icon: CheckCircle2,
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
            whileHover={{ scale: 1.03, translateY: -6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onSelect(action.id)}
            className={`
              relative group
              w-full sm:w-32 md:w-36
              p-4 rounded-2xl overflow-hidden
              transition-all duration-300 ease-out
              cursor-pointer
              ${
                isActive
                  ? 'bg-white shadow-lg'
                  : 'bg-gray-900 border border-gray-800 hover:border-gray-700'
              }
              hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]
              flex flex-col items-center justify-center gap-2
            `}
          >
            {/* Background glow effect - removed */}
            <div
              className={`
                absolute inset-0 opacity-0 group-hover:opacity-0
                transition-opacity duration-300
                blur-xl
              `}
              style={{ zIndex: -1 }}
            />

            {/* Content */}
            <div className="relative flex flex-col items-center gap-2 text-center z-10">
              <motion.div
                animate={isActive ? { scale: 1.2 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <Icon
                  className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors duration-300 ${
                    isActive ? 'text-black' : 'text-gray-500 group-hover:text-gray-400'
                  }`}
                />
              </motion.div>

              <div className="no-underline flex flex-col items-center gap-2" style={{ textDecoration: 'none' }}>
                <h3 
                  className={`font-semibold text-sm sm:text-base transition-colors duration-300 no-underline ${isActive ? 'text-black' : 'text-gray-400 group-hover:text-gray-300'}`}
                  style={{ textDecoration: 'none', textDecorationLine: 'none' }}
                >
                  {action.label}
                </h3>
                <p 
                  className={`text-xs transition-colors duration-300 no-underline ${isActive ? 'text-black/70' : 'text-gray-600 group-hover:text-gray-500'}`}
                  style={{ textDecoration: 'none', textDecorationLine: 'none' }}
                >
                  {action.description}
                </p>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
