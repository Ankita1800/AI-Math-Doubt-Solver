const STAGES = [
  { key: 'hint', label: 'Hint', icon: '💡' },
  { key: 'nextStep', label: 'Next Step', icon: '📐' },
  { key: 'solution', label: 'Full Solution', icon: '✅' },
];

function getStageIndex(currentStage) {
  if (currentStage === 'idle') return -1;
  if (currentStage === 'hint') return 0;
  if (currentStage === 'nextStep') return 1;
  if (currentStage === 'solution' || currentStage === 'done') return 2;
  return -1;
}

export default function StageProgress({ currentStage, hasStarted }) {
  if (!hasStarted) return null;

  const activeIndex = getStageIndex(currentStage);

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-center gap-0 max-w-xs mx-auto">
        {STAGES.map((stage, index) => {
          const isCompleted = index < activeIndex;
          const isCurrent = index === activeIndex;
          const isFuture = index > activeIndex;

          return (
            <div key={stage.key} className="flex items-center flex-1">
              {/* Circle */}
              <div className="flex flex-col items-center flex-1">
                <div
                  className={`
                    w-9 h-9 rounded-full flex items-center justify-center
                    text-sm font-bold transition-all duration-300
                    ${
                      isCompleted
                        ? 'bg-white text-black shadow-md'
                        : isCurrent
                        ? 'bg-gray-900 border-2 border-white text-white animate-ring-pulse'
                        : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                    }
                  `}
                >
                  {isCompleted ? '✓' : stage.icon}
                </div>
                <span
                  className={`
                    text-xs mt-1 font-medium transition-colors duration-300
                    ${
                      isCompleted
                        ? 'text-white'
                        : isCurrent
                        ? 'text-white font-semibold'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {stage.label}
                </span>
              </div>

              {/* Connector line */}
              {index < STAGES.length - 1 && (
                <div
                  className={`
                    h-0.5 w-full -mt-4 transition-colors duration-500
                    ${index < activeIndex ? 'bg-white' : 'bg-gray-200'}
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
