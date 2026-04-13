import { useRef, useEffect } from 'react';

export default function ProblemInput({ problem, setProblem, onSubmit, isLoading }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [problem]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (problem.trim() && !isLoading) {
        onSubmit();
      }
    }
  };

  return (
    <div className="px-4 pb-4">
      <div className="relative">
        <textarea
          ref={textareaRef}
          id="problem-input"
          value={problem}
          onChange={(e) => setProblem(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={"Type your math problem here...\ne.g. Solve: 2x² + 5x − 3 = 0\nor: Find the area of a triangle with base 8cm, height 6cm"}
          rows={3}
          maxLength={500}
          className="
            w-full resize-none rounded-xl border border-gray-200
            bg-white px-4 py-3.5 text-sm text-gray-800
            placeholder:text-gray-400 placeholder:text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
            transition-all duration-200
            leading-relaxed
          "
        />
        <span className="absolute bottom-2.5 right-3 text-xs text-gray-300">
          {problem.length}/500
        </span>
      </div>

      <button
        id="submit-problem-btn"
        onClick={onSubmit}
        disabled={!problem.trim() || isLoading}
        className={`
          mt-3 w-full py-3.5 rounded-xl text-sm font-semibold
          transition-all duration-200 ease-in-out
          cursor-pointer
          flex items-center justify-center gap-2
          ${
            !problem.trim() || isLoading
              ? 'bg-indigo-300 text-white/70 cursor-not-allowed opacity-50'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-[0.98] shadow-md shadow-indigo-200 hover:shadow-lg hover:shadow-indigo-200'
          }
        `}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Thinking...
          </>
        ) : (
          'Get My First Hint →'
        )}
      </button>
    </div>
  );
}
