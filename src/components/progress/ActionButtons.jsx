export function ActionButtons({ currentStage, onNextStep, onSolution, onNewProblem, isLoading }) {
  if (currentStage === 'idle') return null;

  const buttonStyle = {
    padding: '12px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    fontWeight: '600',
    border: 'none',
    cursor: isLoading ? 'not-allowed' : 'pointer',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: isLoading ? '#27272a' : '#6366f1',
    color: isLoading ? '#52525b' : '#ffffff',
    opacity: isLoading ? 0.5 : 1,
  };

  return (
    <div style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* After hint — show Next Step button */}
      {currentStage === 'hint' && (
        <>
          <button
            onClick={onNextStep}
            disabled={isLoading}
            style={primaryButtonStyle}
            onMouseEnter={e => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#4f46e5';
                e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
              }
            }}
            onMouseLeave={e => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#6366f1';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? '⏳ Thinking...' : '📐 Show Next Step →'}
          </button>
          <button
            onClick={onNewProblem}
            disabled={isLoading}
            style={{
              ...buttonStyle,
              backgroundColor: '#111113',
              color: '#d4d4d8',
              border: '1px solid #27272a',
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#18181b';
              e.target.style.borderColor = '#3f3f46';
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = '#111113';
              e.target.style.borderColor = '#27272a';
            }}
          >
            New Problem
          </button>
        </>
      )}

      {/* After next step — show Full Solution button */}
      {currentStage === 'nextStep' && (
        <>
          <button
            onClick={onSolution}
            disabled={isLoading}
            style={primaryButtonStyle}
            onMouseEnter={e => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#4f46e5';
                e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
              }
            }}
            onMouseLeave={e => {
              if (!isLoading) {
                e.target.style.backgroundColor = '#6366f1';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {isLoading ? '⏳ Thinking...' : '✅ Show Full Solution →'}
          </button>
          <button
            onClick={onNewProblem}
            disabled={isLoading}
            style={{
              ...buttonStyle,
              backgroundColor: '#111113',
              color: '#d4d4d8',
              border: '1px solid #27272a',
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#18181b';
              e.target.style.borderColor = '#3f3f46';
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = '#111113';
              e.target.style.borderColor = '#27272a';
            }}
          >
            New Problem
          </button>
        </>
      )}

      {/* After solution — show completion card */}
      {currentStage === 'solution' && (
        <>
          <div
            style={{
              backgroundColor: '#001a0e',
              border: '1px solid #003d1f',
              borderRadius: '14px',
              padding: '16px 20px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: '600', color: '#34d399', marginBottom: '4px' }}>
              🎉 Problem complete!
            </div>
            <div style={{ fontSize: '13px', color: '#2d9d78' }}>
              Try a similar one to build confidence.
            </div>
          </div>
          <button
            onClick={onNewProblem}
            style={{
              ...buttonStyle,
              backgroundColor: '#6366f1',
              color: '#ffffff',
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#4f46e5';
              e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = '#6366f1';
              e.target.style.boxShadow = 'none';
            }}
          >
            ✨ New Problem
          </button>
        </>
      )}
    </div>
  );
}
