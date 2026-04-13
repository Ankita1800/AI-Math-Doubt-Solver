import { motion } from 'framer-motion';

const TOPICS = [
  'Quadratic Equations',
  'Trigonometry',
  'Probability',
  'Geometry',
  'Polynomials',
  'Integration',
  'Limits',
  'Matrices',
  'Calculus',
  'Linear Equations',
  'Vectors',
  'Complex Numbers',
];

export default function TopicChips({ onSelect }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 w-full">
      {TOPICS.map((topic, index) => (
        <motion.button
          key={topic}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.03, duration: 0.3 }}
          whileHover={{ scale: 1.08, translateY: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(topic)}
          className={`
            px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium
            bg-gradient-to-r from-slate-700 to-slate-800
            text-slate-300 hover:text-white
            border border-slate-600 hover:border-slate-500
            transition-all duration-200
            whitespace-nowrap
          `}
        >
          {topic}
        </motion.button>
      ))}
    </div>
  );
}
