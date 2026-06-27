import { useEffect, useRef, useState } from 'react';

const CustomCursor = ({ proMode }) => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const posRef = useRef({ x: -100, y: -100 });
  const currentPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      // Dot follows exactly
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      // Cursor lags behind with lerp
      currentPos.current.x += (posRef.current.x - currentPos.current.x) * 0.12;
      currentPos.current.y += (posRef.current.y - currentPos.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.left = `${currentPos.current.x}px`;
        cursorRef.current.style.top = `${currentPos.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onEnter = (e) => {
      const target = e.target;
      if (
        target.matches('a, button, [data-cursor], .magnetic-btn, input, textarea, .skill-pill, .project-card, .nav-link')
      ) {
        setIsHovering(true);
      }
    };

    const onLeave = (e) => {
      const target = e.target;
      if (
        target.matches('a, button, [data-cursor], .magnetic-btn, input, textarea, .skill-pill, .project-card, .nav-link')
      ) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className={`custom-cursor transition-all duration-300 ${
          proMode
            ? '!mix-blend-normal border-emerald-500/80 bg-emerald-950/10 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
            : isHovering
            ? 'hovering'
            : ''
        }`}
        style={{ 
          left: -100, 
          top: -100,
          borderRadius: '50%',
        }}
      >
        {proMode && (
          <div className="absolute inset-0 rotate-45">
            {/* HUD Target crosshairs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1.5px] h-[5px] bg-emerald-400" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1.5px] h-[5px] bg-emerald-400" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1.5px] w-[5px] bg-emerald-400" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1.5px] w-[5px] bg-emerald-400" />
          </div>
        )}
      </div>
      <div
        ref={dotRef}
        className={`cursor-dot transition-all duration-300 ${
          proMode ? '!mix-blend-normal bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : ''
        }`}
        style={{ left: -100, top: -100 }}
      />
    </>
  );
};

export default CustomCursor;
