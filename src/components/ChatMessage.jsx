import { motion } from 'framer-motion';
import { Copy, Check, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { MathRenderer } from './ui/MathRenderer';

export function ChatMessage({ message, isLoading = false }) {
  const [copied, setCopied] = useState(false);
  const isAI = message.role === 'assistant';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 mb-4 ${isAI ? 'justify-start' : 'justify-end'}`}
    >
      {isAI && (
        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center flex-shrink-0 mt-1">
          <span className="text-xs font-bold text-black">AI</span>
        </div>
      )}

      <div className={`max-w-md lg:max-w-2xl ${isAI ? 'mr-8' : ''}`}>
        <motion.div
          className={`
            p-4 rounded-2xl
            ${
              isAI
                ? 'bg-gray-900 border border-gray-800'
                : 'bg-white'
            }
          `}
        >
          <div className={`text-sm leading-relaxed ${isAI ? 'text-gray-300' : 'text-black'}`}>
            {isLoading ? (
              <div className="flex gap-1">
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                  className="w-2 h-2 bg-white rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                  className="w-2 h-2 bg-white rounded-full"
                />
              </div>
            ) : (
              <>
                {message.type === 'math' ? (
                  <MathRenderer latex={message.content} display />
                ) : (
                  <p>{message.content}</p>
                )}
              </>
            )}
          </div>
        </motion.div>

        {isAI && !isLoading && (
          <div className="flex gap-2 mt-2">
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition text-gray-400 hover:text-white"
              title="Copy"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              className="p-2 rounded-lg bg-gray-900 hover:bg-gray-800 transition text-gray-400 hover:text-white"
              title="Save"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
