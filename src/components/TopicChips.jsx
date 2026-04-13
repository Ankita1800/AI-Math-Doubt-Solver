const TOPIC_CHIPS = [
  { label: 'Quadratic Equations', sample: 'Solve: 2x² + 5x − 3 = 0' },
  { label: 'Trigonometry', sample: 'Prove that: sin²θ + cos²θ = 1' },
  { label: 'Probability', sample: 'A bag has 3 red and 5 blue balls. What is the probability of picking a red ball?' },
  { label: 'Coordinate Geometry', sample: 'Find the distance between points (3, 4) and (0, 0)' },
  { label: 'Polynomials', sample: 'Find the zeroes of p(x) = x² − 5x + 6' },
  { label: 'Integration', sample: 'Integrate: ∫ (2x + 3) dx' },
];

export default function TopicChips({ onSelect }) {
  return (
    <div className="px-4 pb-2">
      <p className="text-xs text-gray-400 mb-2 font-medium">Quick topics:</p>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {TOPIC_CHIPS.map((chip) => (
          <button
            key={chip.label}
            onClick={() => onSelect(chip.sample)}
            className="
              flex-shrink-0 px-3.5 py-1.5 rounded-full
              text-xs font-medium
              bg-indigo-50 text-indigo-600
              border border-indigo-100
              hover:bg-indigo-100 hover:border-indigo-200
              active:scale-95
              transition-all duration-200
              cursor-pointer whitespace-nowrap
            "
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
