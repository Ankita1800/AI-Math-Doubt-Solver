export default function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 animate-fade-in-up">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center text-sm">
        🧠
      </div>
      <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-gray-100">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 bg-white rounded-full dot-1" />
          <div className="w-2.5 h-2.5 bg-gray-400 rounded-full dot-2" />
          <div className="w-2.5 h-2.5 bg-gray-300 rounded-full dot-3" />
        </div>
      </div>
    </div>
  );
}
