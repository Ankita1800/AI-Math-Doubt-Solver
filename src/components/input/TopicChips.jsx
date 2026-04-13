const TOPIC_CHIPS = [
  { label: 'Quadratic Equations', sample: 'Solve: 2x² + 5x − 3 = 0' },
  { label: 'Trigonometry', sample: 'Prove: sin²θ + cos²θ = 1' },
  { label: 'Probability', sample: 'A bag has 3 red, 5 blue balls. P(red)?' },
  { label: 'Coordinate Geometry', sample: 'Distance between (3,4) and (0,0)' },
  { label: 'Polynomials', sample: 'Zeroes of p(x) = x² − 5x + 6' },
  { label: 'Integration', sample: 'Integrate: ∫(3x² + 2x + 1)dx' },
  { label: 'Limits', sample: 'lim x→0 (sin x / x)' },
  { label: 'Matrices', sample: 'Find inverse of [[1,2],[3,4]]' },
];

export function TopicChips({ onSelect }) {
  return (
    <div style={{ padding: '0 20px 12px 20px' }}>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#52525b', marginBottom: '8px' }}>
        Try these:
      </div>
      <div
        style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
        }}
        className="scrollbar-thin"
      >
        {TOPIC_CHIPS.map(chip => (
          <button
            key={chip.label}
            onClick={() => onSelect(chip.sample)}
            style={{
              flexShrink: 0,
              padding: '8px 12px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500',
              backgroundColor: '#18181b',
              border: '1px solid #3f3f46',
              color: '#a1a1aa',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              e.target.style.backgroundColor = '#111113';
              e.target.style.borderColor = '#6366f1';
              e.target.style.color = '#6366f1';
            }}
            onMouseLeave={e => {
              e.target.style.backgroundColor = '#18181b';
              e.target.style.borderColor = '#3f3f46';
              e.target.style.color = '#a1a1aa';
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}
