export function TypingIndicator() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        animation: 'fadeInUp 0.35s ease both',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '10px',
          backgroundColor: '#18181b',
          border: '1px solid #252540',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
        }}
      >
        🧠
      </div>

      {/* Bubble with dots */}
      <div
        style={{
          backgroundColor: '#111113',
          border: '1px solid #27272a',
          borderRadius: '4px 18px 18px 18px',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {[0, 1, 2].map(i => (
          <div
            key={i}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#6366f1',
              animation: `typingBounce 1.4s infinite`,
              animationDelay: `${i * 0.16}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
