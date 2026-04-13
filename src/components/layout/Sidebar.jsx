import { HistoryPanel } from '../history/HistoryPanel';
import { GradeSelector } from '../ui/GradeSelector';

export function Sidebar({ isOpen, onClose, grade, setGrade, onSelectProblem }) {
  return (
    <>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 39,
            display: 'none',
          }}
          className="md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        style={{
          width: '260px',
          backgroundColor: '#111113',
          borderRight: '1px solid #27272a',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflowY: 'auto',
          position: 'relative',
          zIndex: 40,
        }}
        className="scrollbar-thin hidden md:flex"
      >
        {/* Desktop - always visible */}
        <SidebarContent
          grade={grade}
          setGrade={setGrade}
          onSelectProblem={onSelectProblem}
        />
      </div>

      {/* Mobile Drawer */}
      <div
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '260px',
          height: '100vh',
          backgroundColor: '#111113',
          borderRight: '1px solid #27272a',
          display: isOpen ? 'flex' : 'none',
          flexDirection: 'column',
          zIndex: 40,
          animation: isOpen ? 'slideIn 0.2s ease' : 'slideOut 0.2s ease',
          paddingTop: '56px',
        }}
        className="md:hidden"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            fontSize: '20px',
            color: '#f4f4f5',
            cursor: 'pointer',
          }}
        >
          ✕
        </button>

        <SidebarContent
          grade={grade}
          setGrade={setGrade}
          onSelectProblem={onSelectProblem}
          onClose={onClose}
        />
      </div>
    </>
  );
}

function SidebarContent({ grade, setGrade, onSelectProblem, onClose }) {
  return (
    <>
      {/* Top - Logo & Navigation */}
      <div style={{ padding: '20px', borderBottom: '1px solid #27272a' }}>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', alignItems: 'center' }}>
          <div
            style={{
              fontSize: '28px',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            📱
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ fontSize: '20px' }}>✓</div>
            <div style={{ fontSize: '18px', fontWeight: '700', color: '#f4f4f5' }}>
              Math AI
            </div>
          </div>
        </div>

        {/* Nav Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { icon: '🧮', label: 'Math Solver', active: true },
            { icon: '📖', label: 'How It Works' },
            { icon: '⚙️', label: 'Settings' },
          ].map(item => (
            <div
              key={item.label}
              style={{
                padding: '10px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '13px',
                fontWeight: item.active ? '600' : '500',
                color: item.active ? '#6366f1' : '#a1a1aa',
                backgroundColor: item.active ? 'rgba(99, 102, 241, 0.1)' : 'transparent',
              }}
              onMouseEnter={e => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = '#18181b';
                  e.currentTarget.style.color = '#d4d4d8';
                }
              }}
              onMouseLeave={e => {
                if (!item.active) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = '#a1a1aa';
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Grade Selector (mobile) */}
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }} className="md:hidden">
          <div style={{ fontSize: '11px', fontWeight: '600', color: '#52525b' }}>
            CURRENT GRADE
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <GradeSelector grade={grade} setGrade={setGrade} />
          </div>
        </div>
      </div>

      {/* Middle - History */}
      <div style={{ flex: 1, overflow: 'hidden', overflowY: 'auto' }} className="scrollbar-thin">
        <HistoryPanel
          onSelectProblem={problem => {
            onSelectProblem(problem);
            if (onClose) onClose();
          }}
        />
      </div>

      {/* Bottom - Tagline */}
      <div
        style={{
          padding: '16px 20px',
          borderTop: '1px solid #27272a',
          fontSize: '12px',
          color: '#52525b',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        "Hints first. Answers later."
      </div>
    </>
  );
}
