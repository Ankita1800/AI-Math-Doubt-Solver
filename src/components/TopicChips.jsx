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
    <div className="flex flex-wrap gap-2">
      {TOPICS.map((topic, index) => (
        <motion.button
          key={topic}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.02 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onSelect(topic)}
          className={`
            px-3 py-1 rounded-full text-xs font-medium
            bg-gradient-to-r from-slate-700 to-slate-800
            text-slate-300 hover:text-white
            border border-slate-600 hover:border-slate-500
            transition-all duration-200
          `}
        >
          {topic}
        </motion.button>
      ))}
    </div>
  );
}
