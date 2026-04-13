import { useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';

export default function ChatWindow({ messages, isLoading }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="animate-gentle-pulse text-6xl mb-5">🧮</div>
        <h2 className="text-lg font-semibold text-gray-700 mb-2 text-center">
          Ask any math problem
        </h2>
        <p className="text-sm text-gray-400 text-center max-w-sm leading-relaxed">
          I'll guide you step by step — not just give answers.
          <br />
          Select your grade, type a problem, and let's learn together!
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scrollbar-thin">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg} />
      ))}
      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
}
