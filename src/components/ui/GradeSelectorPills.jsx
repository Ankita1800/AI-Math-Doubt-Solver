import { motion } from 'framer-motion';
import { useAppStore } from '../../store/appStore';

const GRADES = [
  { id: '5-6', label: 'Grade 5–6' },
  { id: '7-8', label: 'Grade 7–8' },
  { id: '9-10', label: 'Grade 9–10' },
  { id: '11-12', label: 'Grade 11–12' },
];

export function GradeSelectorPills() {
  const { grade, setGrade } = useAppStore();

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
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
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
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
