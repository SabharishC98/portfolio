import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

/**
 * Trionn-style staggered character-by-character text reveal.
 * Each character slides up from below with blur dissolve on scroll-into-view.
 * 
 * Props:
 *  - text: string
 *  - className: applied to the outer wrapper
 *  - delay: initial delay in seconds (default 0)
 *  - stagger: per-char delay in seconds (default 0.025)
 *  - tag: HTML tag to render as ('h1', 'h2', 'p', 'span', etc.)
 */
const SplitText = ({
  text = '',
  className = '',
  delay = 0,
  stagger = 0.025,
  tag: Tag = 'span',
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });

  const chars = text.split('');

  return (
    <Tag
      ref={ref}
      className={`split-text-wrapper inline-block overflow-hidden ${className}`}
      aria-label={text}
    >
      <span className="inline-flex flex-wrap" aria-hidden="true">
        {chars.map((char, i) => (
          <motion.span
            key={i}
            className="inline-block will-change-[transform,opacity,filter]"
            style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
            initial={{ y: '110%', opacity: 0, filter: 'blur(4px)' }}
            animate={
              inView
                ? { y: 0, opacity: 1, filter: 'blur(0px)' }
                : { y: '110%', opacity: 0, filter: 'blur(4px)' }
            }
            transition={{
              duration: 0.55,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    </Tag>
  );
};

export default SplitText;
