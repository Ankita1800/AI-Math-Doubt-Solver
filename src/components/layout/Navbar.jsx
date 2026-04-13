import { GradeSelector } from '../ui/GradeSelector';

export function Navbar({ grade, setGrade, hasStarted, onNewProblem, onToggleSidebar }) {
  return (
    <div
      style={{
        height: '56px',
        borderBottom: '1px solid #27272a',
        backgroundColor: '#09090b',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '20px',
        paddingRight: '20px',
        gap: '16px',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Hamburger (mobile only) */}
      <button
        onClick={onToggleSidebar}
        style={{
          display: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '20px',
          color: '#f4f4f5',
        }}
        className="md:hidden"
      >
        ☰
      </button>

      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          flex: 1,
        }}
      >
        <span style={{ fontSize: '24px' }}>🧠</span>
        <span
          style={{
            fontSize: '18px',
            fontWeight: '700',
            color: '#f4f4f5',
            letterSpacing: '-0.02em',
          }}
        >
          MathMind
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            backgroundColor: '#6366f1',
            color: '#ffffff',
            padding: '4px 10px',
            borderRadius: '12px',
            fontSize: '10px',
            fontWeight: '700',
            letterSpacing: '0.05em',
          }}
        >
          AI TUTOR
        </span>
      </div>

      {/* Grade Selector (desktop) */}
      <div className="hidden md:block">
        <GradeSelector grade={grade} setGrade={setGrade} />
      </div>

      {/* + New Button */}
      {hasStarted && (
        <button
          onClick={onNewProblem}
          style={{
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: '600',
            border: '1px solid #27272a',
            backgroundColor: 'transparent',
            color: '#d4d4d8',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
          onMouseEnter={e => {
            e.target.style.backgroundColor = '#111113';
            e.target.style.borderColor = '#3f3f46';
          }}
          onMouseLeave={e => {
            e.target.style.backgroundColor = 'transparent';
            e.target.style.borderColor = '#27272a';
          }}
        >
          + New
        </button>
      )}
    </div>
  );
}
