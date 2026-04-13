export function EmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px',
        padding: '40px 20px',
        textAlign: 'center',
      }}
    >
      {/* Heading */}
      <div style={{ fontSize: '28px', fontWeight: '700', color: '#f4f4f5', marginBottom: '12px' }}>
        What do you want to solve today?
      </div>

      {/* Subtext */}
      <div
        style={{
          fontSize: '14px',
          color: '#52525b',
          marginBottom: '32px',
          maxWidth: '500px',
          lineHeight: '1.6',
        }}
      >
        I guide you step by step — hints first, answers later. Learn the why, not just the answer.
      </div>

      {/* Feature Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '16px',
          marginBottom: '32px',
          width: '100%',
          maxWidth: '600px',
        }}
      >
        {[
          { icon: '💡', title: 'Hint', desc: 'Get pointed in the right direction' },
          { icon: '📐', title: 'Next Step', desc: 'See the first step explained' },
          { icon: '✅', title: 'Full Solution', desc: 'Complete step-by-step breakdown' },
        ].map(card => (
          <div
            key={card.title}
            style={{
              backgroundColor: '#111113',
              border: '1px solid #27272a',
              borderRadius: '16px',
              padding: '16px',
              transition: 'all 0.2s ease',
              cursor: 'pointer',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#18181b';
              e.currentTarget.style.borderColor = '#3f3f46';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#111113';
              e.currentTarget.style.borderColor = '#27272a';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>{card.icon}</div>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#f4f4f5', marginBottom: '4px' }}>
              {card.title}
            </div>
            <div style={{ fontSize: '12px', color: '#52525b' }}>{card.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
