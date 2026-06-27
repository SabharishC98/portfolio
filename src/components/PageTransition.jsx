import { useEffect, useRef } from 'react';

/**
 * Trionn-style page-load belt wipe.
 * 10 horizontal strips slide down from 0→100% height, then collapse upward.
 * Runs once on mount after a short delay (so the preloader has already cleared).
 */
const PageTransition = () => {
  const overlayRef = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const overlay = overlayRef.current;
    if (!overlay) return;

    const belts = overlay.querySelectorAll('.pt-belt');
    const STAGGER = 35; // ms between each belt
    const DURATION = 420; // ms for each belt

    // Phase 1 – belts enter (slide from height 0 → 100%)
    belts.forEach((belt, i) => {
      setTimeout(() => {
        belt.style.transition = `transform ${DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`;
        belt.style.transform = 'scaleY(1)';
      }, i * STAGGER);
    });

    const phase2Start = belts.length * STAGGER + DURATION + 80;

    // Phase 2 – belts exit (collapse upward)
    belts.forEach((belt, i) => {
      setTimeout(() => {
        belt.style.transition = `transform ${DURATION}ms cubic-bezier(0.76, 0, 0.24, 1)`;
        belt.style.transformOrigin = 'top';
        belt.style.transform = 'scaleY(0)';
      }, phase2Start + i * STAGGER);
    });

    // Hide overlay after animation completes
    setTimeout(() => {
      if (overlay) overlay.style.display = 'none';
    }, phase2Start + belts.length * STAGGER + DURATION + 100);
  }, []);

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        pointerEvents: 'none',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="pt-belt"
          style={{
            flex: 1,
            background: '#111111',
            transform: 'scaleY(0)',
            transformOrigin: 'bottom',
          }}
        />
      ))}
    </div>
  );
};

export default PageTransition;
