import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export const useScrollReveal = (options = {}) => {
  const { ref, inView } = useInView({
    threshold: options.threshold || 0.15,
    triggerOnce: options.triggerOnce !== false,
    rootMargin: options.rootMargin || '0px 0px -60px 0px',
  });

  return { ref, inView };
};

export const useCountUp = (end, duration = 2000, start = 0) => {
  const countRef = useRef(null);
  const [count, setCount] = [
    typeof window !== 'undefined' ? 0 : 0,
    () => {},
  ];

  return { countRef };
};
