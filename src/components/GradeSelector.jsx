const GRADES = [
  { label: 'Grade 5–6', value: 'Grade 5-6' },
  { label: 'Grade 7–8', value: 'Grade 7-8' },
  { label: 'Grade 9–10', value: 'Grade 9-10' },
  { label: 'Grade 11–12', value: 'Grade 11-12' },
];

export default function GradeSelector({ grade, setGrade }) {
  return (
    <div className="flex flex-wrap justify-center gap-2 px-4 pb-3">
      {GRADES.map((g) => (
        <button
          key={g.value}
          id={`grade-btn-${g.value.replace(/\s+/g, '-')}`}
          onClick={() => setGrade(g.value)}
          className={`
            px-4 py-2 rounded-full text-sm font-semibold
            transition-all duration-200 ease-in-out
            cursor-pointer border
            active:scale-95
            ${
              grade === g.value
                ? 'bg-white text-black border-white shadow-md'
                : 'bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-700 hover:text-white hover:shadow-sm'
            }
          `}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
}
