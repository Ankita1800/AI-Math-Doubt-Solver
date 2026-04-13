import { useRef, useEffect } from 'react';

export function ProblemInput({ problem, setProblem, onSubmit, isLoading }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [problem]);

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (problem.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div
      style={{
        position: 'sticky',
        bottom: 0,
        backgroundColor: '#09090b',
        borderTop: '1px solid #27272a',
        padding: '16px 20px',
        zIndex: 40,
      }}
    >
      <div style={{ position: 'relative' }}>
        <textarea
          ref={textareaRef}
          value={problem}
          onChange={e => setProblem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask MathMind a problem... e.g. Solve 2x² + 5x − 3 = 0"
          maxLength={500}
          style={{
            width: '100%',
            resize: 'none',
            borderRadius: '16px',
            border: '1px solid #27272a',
            backgroundColor: '#18181b',
            color: '#f4f4f5',
            padding: '12px 16px',
            fontSize: '14px',
            fontFamily: 'Inter, system-ui, sans-serif',
            lineHeight: '1.5',
            outline: 'none',
            transition: 'border-color 0.2s ease',
            minHeight: '44px',
            maxHeight: '120px',
            overflow: 'hidden',
          }}
          onFocus={e => {
            e.target.style.borderColor = '#3f3f46';
          }}
          onBlur={e => {
            e.target.style.borderColor = '#27272a';
          }}
        />
        <span
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '16px',
            fontSize: '12px',
            color: '#52525b',
          }}
        >
          {problem.length}/500
        </span>
      </div>

      <button
        onClick={onSubmit}
        disabled={!problem.trim() || isLoading}
        style={{
          marginTop: '12px',
          width: '100%',
          padding: '12px 16px',
          borderRadius: '12px',
          fontSize: '14px',
          fontWeight: '600',
          border: 'none',
          cursor: !problem.trim() || isLoading ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          transition: 'all 0.2s ease',
          backgroundColor: !problem.trim() || isLoading ? '#27272a' : '#6366f1',
          color: !problem.trim() || isLoading ? '#52525b' : '#ffffff',
          opacity: !problem.trim() || isLoading ? 0.5 : 1,
        }}
        onMouseEnter={e => {
          if (!(!problem.trim() || isLoading)) {
            e.target.style.backgroundColor = '#4f46e5';
            e.target.style.boxShadow = '0 4px 12px rgba(99, 102, 241, 0.3)';
          }
        }}
        onMouseLeave={e => {
          if (!(!problem.trim() || isLoading)) {
            e.target.style.backgroundColor = '#6366f1';
            e.target.style.boxShadow = 'none';
          }
        }}
      >
        {isLoading ? '⏳ Thinking...' : '→ Send'}
      </button>

      <div
        style={{
          marginTop: '12px',
          fontSize: '11px',
          color: '#52525b',
          textAlign: 'center',
        }}
      >
        MathMind · Powered by Gemini · CBSE/NCERT
      </div>
    </div>
  );
}
