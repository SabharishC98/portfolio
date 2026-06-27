import { useRef, useCallback } from 'react';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';

/**
 * Text scramble effect on hover.
 * Letters randomize through CHARS then settle on the real text.
 *
 * Usage:
 *   <TextScramble text="Hello World" className="text-white font-bold" />
 */
const TextScramble = ({ text = '', className = '', tag: Tag = 'span' }) => {
  const elRef = useRef(null);
  const rafRef = useRef(null);
  const frameRef = useRef(0);
  const resolvedRef = useRef([]);

  const scramble = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    frameRef.current = 0;
    resolvedRef.current = Array(text.length).fill(false);
    const totalFrames = text.length * 3;

    const tick = () => {
      const frame = frameRef.current;
      let output = '';

      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { output += ' '; continue; }

        if (resolvedRef.current[i]) {
          output += text[i];
          continue;
        }

        // Resolve each char at staggered frames
        if (frame >= i * 3) {
          resolvedRef.current[i] = true;
          output += text[i];
        } else {
          output += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }

      if (elRef.current) elRef.current.textContent = output;

      frameRef.current++;
      if (frame < totalFrames) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        if (elRef.current) elRef.current.textContent = text;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [text]);

  const reset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    if (elRef.current) elRef.current.textContent = text;
  }, [text]);

  return (
    <Tag
      ref={elRef}
      className={className}
      onMouseEnter={scramble}
      onMouseLeave={reset}
      style={{ cursor: 'default', display: 'inline-block' }}
    >
      {text}
    </Tag>
  );
};

export default TextScramble;
