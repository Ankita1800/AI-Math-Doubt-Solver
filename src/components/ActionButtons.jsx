export default function ActionButtons({ currentStage, onNextStep, onSolution, onNewProblem, isLoading }) {
  if (currentStage === 'idle') return null;

  return (
    <div className="px-4 pb-4 space-y-2.5 animate-fade-in-up">
      {/* After hint — show Next Step button */}
      {currentStage === 'hint' && (
        <button
          id="next-step-btn"
          onClick={onNextStep}
          disabled={isLoading}
          className={`
            w-full py-3.5 rounded-xl text-sm font-semibold
            transition-all duration-200 ease-in-out cursor-pointer
            flex items-center justify-center gap-2
            ${
              isLoading
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
                : 'bg-white text-black hover:bg-gray-100 active:scale-[0.98] shadow-md hover:shadow-lg'
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
            'Show Next Step →'
          )}
        </button>
      )}

      {/* After next step — show Full Solution button */}
      {currentStage === 'nextStep' && (
        <button
          id="full-solution-btn"
          onClick={onSolution}
          disabled={isLoading}
          className={`
            w-full py-3.5 rounded-xl text-sm font-semibold
            transition-all duration-200 ease-in-out cursor-pointer
            flex items-center justify-center gap-2
            ${
              isLoading
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed opacity-50'
                : 'bg-white text-black hover:bg-gray-100 active:scale-[0.98] shadow-md hover:shadow-lg'
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
            'Show Full Solution →'
          )}
        </button>
      )}

      {/* After solution — show completion card */}
      {currentStage === 'done' && (
        <div className="bg-white border border-gray-300 rounded-xl px-5 py-4 text-center">
          <p className="text-sm text-black font-medium mb-1">
            🎉 Did this help?
          </p>
          <p className="text-xs text-gray-600">
            Try solving a similar problem now to strengthen your understanding!
          </p>
        </div>
      )}

      {/* New Problem button — always visible after started */}
      <button
        id="new-problem-btn"
        onClick={onNewProblem}
        className={`
          w-full py-3 rounded-xl text-sm font-semibold
          transition-all duration-200 ease-in-out cursor-pointer
          active:scale-[0.98]
          ${
            currentStage === 'done'
              ? 'border-2 border-white text-white bg-black hover:bg-gray-900'
              : 'bg-gray-900 text-gray-500 hover:bg-gray-800 hover:text-gray-400'
          }
        `}
      >
        {currentStage === 'done' ? '✨ Try a New Problem' : 'Try a New Problem'}
      </button>
    </div>
  );
}
