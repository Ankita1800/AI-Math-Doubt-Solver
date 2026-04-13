import { MathRenderer } from './MathRenderer';
import { StageBadge } from '../progress/StageBadge';

export function MessageBubble({ message }) {
  const { role, text, stage } = message;

  if (role === 'user') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          animation: 'fadeInUp 0.35s ease both',
        }}
      >
        <div
          style={{
            maxWidth: '78%',
            backgroundColor: '#6366f1',
            color: '#ffffff',
            borderRadius: '18px 18px 4px 18px',
            padding: '12px 16px',
            fontSize: '14px',
            lineHeight: '1.5',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
          }}
        >
          {text}
        </div>
      </div>
    );
  }

  // AI message
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

      {/* Message */}
      <div style={{ flex: 1, maxWidth: '78%' }}>
        {stage && <StageBadge stage={stage} />}
        <div
          style={{
            backgroundColor: '#111113',
            border: '1px solid #27272a',
            borderRadius: '4px 18px 18px 18px',
            padding: '12px 16px',
            fontSize: '14px',
            lineHeight: '1.75',
            color: '#d4d4d8',
          }}
        >
          <MathRenderer text={text} />
        </div>
      </div>
    </div>
  );
}
