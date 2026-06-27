import { useEffect, useRef } from 'react';

/**
 * Trionn-style floating "+" crosshair that trails the cursor.
 * A second lagging crosshair creates a ghost echo effect.
 */
const FloatingCrosshair = () => {
  const crossRef = useRef(null);
  const echoRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const echo = useRef({ x: -100, y: -100 });
  const raf = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      // Lag the echo behind the real cursor
      echo.current.x += (mouse.current.x - echo.current.x) * 0.12;
      echo.current.y += (mouse.current.y - echo.current.y) * 0.12;

      if (crossRef.current) {
        crossRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      }
      if (echoRef.current) {
        echoRef.current.style.transform = `translate(${echo.current.x}px, ${echo.current.y}px)`;
      }

      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const crosshairSVG = (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="6.5" y1="0" x2="6.5" y2="13" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="6.5" x2="13" y2="6.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );

  return (
    <>
      {/* Instant crosshair */}
      <div
        ref={crossRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 13,
          height: 13,
          marginLeft: -6.5,
          marginTop: -6.5,
          color: 'rgba(255,255,255,0.55)',
          pointerEvents: 'none',
          zIndex: 99997,
          willChange: 'transform',
        }}
      >
        {crosshairSVG}
      </div>

      {/* Echo crosshair (lagging) */}
      <div
        ref={echoRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 13,
          height: 13,
          marginLeft: -6.5,
          marginTop: -6.5,
          color: 'rgba(255,255,255,0.18)',
          pointerEvents: 'none',
          zIndex: 99996,
          willChange: 'transform',
        }}
      >
        {crosshairSVG}
      </div>
    </>
  );
};

export default FloatingCrosshair;
