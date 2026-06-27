import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

/**
 * Animated counting number — counts from 0 up to `end` when in view.
 * Supports suffix (e.g. "+" or "%") and prefix.
 */
const AnimatedCounter = ({
  end,
  suffix = '',
  prefix = '',
  duration = 1800,
  className = '',
}) => {
  const numericEnd = parseInt(String(end).replace(/\D/g, ''), 10) || 0;
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const elRef = useRef(null);
  const rafRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || hasRun.current) return;
    hasRun.current = true;

    const startTime = performance.now();

    // Easing: easeOutExpo
    const ease = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.round(ease(progress) * numericEnd);

      if (elRef.current) {
        elRef.current.textContent = `${prefix}${current}${suffix}`;
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, numericEnd, duration, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      <span ref={elRef}>{prefix}0{suffix}</span>
    </span>
  );
};

export default AnimatedCounter;
