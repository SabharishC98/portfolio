import { useEffect, useRef } from 'react';

/**
 * Thin scroll-progress bar fixed at the very top of the viewport.
 * Fills left→right as the user scrolls down the page.
 */
const ScrollProgressBar = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      if (barRef.current) {
        barRef.current.style.width = `${pct}%`;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 99999,
        background: 'rgba(255,255,255,0.05)',
        pointerEvents: 'none',
      }}
    >
      <div
        ref={barRef}
        style={{
          height: '100%',
          width: '0%',
          background: 'linear-gradient(90deg, #ffffff 0%, #aaaaaa 100%)',
          boxShadow: '0 0 8px rgba(255,255,255,0.4)',
          transition: 'width 0.05s linear',
        }}
      />
    </div>
  );
};

export default ScrollProgressBar;
