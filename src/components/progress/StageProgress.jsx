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

export function StageProgress({ currentStage, hasStarted }) {
  if (!hasStarted) return null;

  const activeIndex = getStageIndex(currentStage);

  return (
    <div
      style={{
        padding: '16px 20px',
        borderBottom: '1px solid #27272a',
        backgroundColor: '#09090b',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        {STAGES.map((stage, index) => {
          const isCompleted = index < activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <div
              key={stage.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}
            >
              {/* Circle */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '700',
                    transition: 'all 0.3s ease',
                    backgroundColor: isCompleted ? '#ffffff' : isCurrent ? '#09090b' : '#27272a',
                    color: isCompleted ? '#000000' : isCurrent ? '#ffffff' : '#52525b',
                    border: isCurrent ? '2px solid #ffffff' : isCompleted ? 'none' : '2px solid #27272a',
                    animation: isCurrent ? 'pulseRing 2s infinite' : 'none',
                  }}
                >
                  {isCompleted ? '✓' : stage.icon}
                </div>
                <span
                  style={{
                    fontSize: '11px',
                    marginTop: '6px',
                    fontWeight: '600',
                    transition: 'color 0.3s ease',
                    color: isCompleted || isCurrent ? '#ffffff' : '#52525b',
                  }}
                >
                  {stage.label}
                </span>
              </div>

              {/* Connector line */}
              {index < STAGES.length - 1 && (
                <div
                  style={{
                    height: '2px',
                    width: '100%',
                    backgroundColor: index < activeIndex ? '#ffffff' : '#27272a',
                    transition: 'background-color 0.5s ease',
                    marginTop: '-24px',
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
