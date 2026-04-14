import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

const GRADES = [
  { id: '5-6', label: 'Grade 5–6', shortLabel: '5–6' },
  { id: '7-8', label: 'Grade 7–8', shortLabel: '7–8' },
  { id: '9-10', label: 'Grade 9–10', shortLabel: '9–10' },
  { id: '11-12', label: 'Grade 11–12', shortLabel: '11–12' },
];

export function GradeSelectorPills({ isCompact = false }) {
  const { grade, setGrade } = useAppStore();

  if (isCompact) {
    return (
      <div className="flex flex-col gap-2">
        {GRADES.map((g) => (
          <motion.button
            key={g.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGrade(g.id)}
            className={`
              w-8 h-8 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-center
              ${
                grade === g.id
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }
            `}
            title={g.label}
          >
            {g.shortLabel.split('–')[0]}
          </motion.button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
        Current Grade
      </label>
      <div className="flex flex-wrap gap-2">
        {GRADES.map((g) => (
          <motion.button
            key={g.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setGrade(g.id)}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                grade === g.id
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }
            `}
          >
            {g.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
