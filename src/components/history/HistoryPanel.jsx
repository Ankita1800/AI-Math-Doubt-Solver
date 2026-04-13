import { useHistory } from '../../hooks/useHistory';

export function HistoryPanel({ onSelectProblem }) {
  const { history } = useHistory();

  return (
    <div style={{ padding: '16px', borderTop: '1px solid #27272a' }}>
      <div style={{ fontSize: '12px', fontWeight: '600', color: '#a1a1aa', marginBottom: '12px' }}>
        RECENT PROBLEMS
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {history.length === 0 ? (
          <div style={{ fontSize: '12px', color: '#52525b' }}>No history yet</div>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              onClick={() => onSelectProblem(item.problem)}
              style={{
                fontSize: '12px',
                color: '#a1a1aa',
                cursor: 'pointer',
                padding: '8px',
                borderRadius: '6px',
                transition: 'all 0.2s ease',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#18181b';
                e.currentTarget.style.color = '#d4d4d8';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#a1a1aa';
              }}
            >
              • {item.problem.substring(0, 38)}
              {item.problem.length > 38 ? '...' : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
