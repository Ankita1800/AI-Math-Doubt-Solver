import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export function MathRenderer({ text }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      // Split text by $$ (display) and $ (inline)
      const parts = [];
      let lastIndex = 0;
      
      // Match both $$ and $ patterns
      const regex = /\$\$(.+?)\$\$|\$(.+?)\$/gs;
      let match;

      while ((match = regex.exec(text)) !== null) {
        // Add text before math
        if (match.index > lastIndex) {
          parts.push({
            type: 'text',
            content: text.slice(lastIndex, match.index),
          });
        }

        // Add math
        if (match[1] !== undefined) {
          // Display math
          parts.push({
            type: 'display',
            content: match[1],
          });
        } else {
          // Inline math
          parts.push({
            type: 'inline',
            content: match[2],
          });
        }
        lastIndex = regex.lastIndex;
      }

      // Add remaining text
      if (lastIndex < text.length) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex),
        });
      }

      // Render parts
      containerRef.current.innerHTML = '';
      parts.forEach(part => {
        if (part.type === 'text') {
          const span = document.createElement('span');
          span.style.whiteSpace = 'pre-wrap';
          span.textContent = part.content;
          containerRef.current.appendChild(span);
        } else if (part.type === 'inline') {
          const span = document.createElement('span');
          try {
            span.innerHTML = katex.renderToString(part.content, {
              throwOnError: false,
              output: 'mathml',
            });
          } catch (e) {
            span.textContent = `$${part.content}$`;
          }
          containerRef.current.appendChild(span);
        } else if (part.type === 'display') {
          const div = document.createElement('div');
          div.style.margin = '10px 0';
          div.style.textAlign = 'center';
          try {
            div.innerHTML = katex.renderToString(part.content, {
              throwOnError: false,
              output: 'mathml',
              displayMode: true,
            });
          } catch (e) {
            div.textContent = `$$${part.content}$$`;
          }
          containerRef.current.appendChild(div);
        }
      });
    } catch (error) {
      console.error('Error rendering math:', error);
      if (containerRef.current) {
        containerRef.current.textContent = text;
      }
    }
  }, [text]);

  return <div ref={containerRef} style={{ whiteSpace: 'pre-wrap' }} />;
}
