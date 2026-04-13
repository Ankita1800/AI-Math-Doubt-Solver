const GRADES = [
  { label: 'Grade 5–6', value: 'Grade 5-6' },
  { label: 'Grade 7–8', value: 'Grade 7-8' },
  { label: 'Grade 9–10', value: 'Grade 9-10' },
  { label: 'Grade 11–12', value: 'Grade 11-12' },
];

export function GradeSelector({ grade, setGrade }) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {GRADES.map(g => (
        <button
          key={g.value}
          onClick={() => setGrade(g.value)}
          style={{
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '13px',
            fontWeight: '600',
            border: '1px solid',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            backgroundColor: grade === g.value ? '#6366f1' : 'transparent',
            color: grade === g.value ? '#ffffff' : '#a1a1aa',
            borderColor: grade === g.value ? '#6366f1' : '#27272a',
          }}
          onMouseEnter={e => {
            if (grade !== g.value) {
              e.target.style.borderColor = '#3f3f46';
              e.target.style.color = '#d4d4d8';
            }
          }}
          onMouseLeave={e => {
            if (grade !== g.value) {
              e.target.style.borderColor = '#27272a';
              e.target.style.color = '#a1a1aa';
            }
          }}
        >
          {g.label}
        </button>
      ))}
    </div>
  );
}
