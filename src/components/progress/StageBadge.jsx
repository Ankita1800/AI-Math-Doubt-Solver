export function StageBadge({ stage }) {
  const stageConfig = {
    hint: {
      bg: '#251c00',
      border: '#3d2e00',
      color: '#fbbf24',
      icon: '💡',
      label: 'Hint',
    },
    nextStep: {
      bg: '#0c0a1f',
      border: '#1e1a3a',
      color: '#818cf8',
      icon: '📐',
      label: 'Next Step',
    },
    solution: {
      bg: '#001a0e',
      border: '#003d1f',
      color: '#34d399',
      icon: '✅',
      label: 'Full Solution',
    },
  };

  const config = stageConfig[stage] || stageConfig.hint;

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px',
        backgroundColor: config.bg,
        border: `1px solid ${config.border}`,
        borderRadius: '8px',
        padding: '4px 10px',
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '0.02em',
        color: config.color,
        marginBottom: '8px',
      }}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </div>
  );
}
