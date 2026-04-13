const STAGE_BADGES = {
  hint: {
    label: '💡 Hint',
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    borderColor: 'border-l-amber-400',
  },
  nextStep: {
    label: '📐 Next Step',
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    borderColor: 'border-l-blue-400',
  },
  solution: {
    label: '✅ Full Solution',
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    borderColor: 'border-l-emerald-400',
  },
};

function formatText(text) {
  // Split text by newlines and render with proper line breaks
  return text.split('\n').map((line, i) => (
    <span key={i}>
      {line}
      {i < text.split('\n').length - 1 && <br />}
    </span>
  ));
}

export default function MessageBubble({ message }) {
  const { role, text, stage } = message;

  if (role === 'user') {
    return (
      <div className="flex justify-end animate-fade-in-up">
        <div
          className="
            max-w-[85%] bg-indigo-600 text-white
            rounded-2xl rounded-br-sm
            px-5 py-3.5 shadow-md shadow-indigo-100
            text-sm leading-relaxed
          "
        >
          {formatText(text)}
        </div>
      </div>
    );
  }

  // AI message
  const badge = STAGE_BADGES[stage];

  return (
    <div className="flex items-start gap-3 animate-fade-in-up">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-sm mt-1">
        🧠
      </div>
      <div
        className={`
          max-w-[85%] bg-white
          rounded-2xl rounded-tl-sm
          px-5 py-4 shadow-sm
          border border-gray-100
          border-l-4 ${badge?.borderColor || 'border-l-indigo-300'}
        `}
      >
        {badge && (
          <span
            className={`
              inline-block text-xs font-semibold px-2.5 py-1
              rounded-full border mb-3
              ${badge.className}
            `}
          >
            {badge.label}
          </span>
        )}
        <div className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap font-[system-ui]">
          {formatText(text)}
        </div>
      </div>
    </div>
  );
}
