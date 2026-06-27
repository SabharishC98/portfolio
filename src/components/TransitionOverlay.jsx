import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TransitionOverlay = ({ isActive }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    
    // Set size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize stars
    const starCount = 180;
    const stars = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width,
        y: (Math.random() - 0.5) * canvas.height,
        z: Math.random() * canvas.width,
        color: Math.random() > 0.5 ? '#10b981' : '#06b6d4' // Green and cyan streaks
      });
    }

    const animate = () => {
      // Semi-transparent clear to leave streaks
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < starCount; i++) {
        const star = stars[i];
        
        // Speed up the warp
        star.z -= 18;

        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = (Math.random() - 0.5) * canvas.width;
          star.y = (Math.random() - 0.5) * canvas.height;
        }

        // Calculate 3D projection
        const k = 128.0 / star.z;
        const px = star.x * k + cx;
        const py = star.y * k + cy;

        // Calculate tail (for streak length)
        const oldK = 128.0 / (star.z + 40);
        const ox = star.x * oldK + cx;
        const oy = star.y * oldK + cy;

        if (px >= 0 && px <= canvas.width && py >= 0 && py <= canvas.height) {
          ctx.beginPath();
          ctx.strokeStyle = star.color;
          ctx.lineWidth = Math.min(2.5, k * 1.5);
          ctx.moveTo(ox, oy);
          ctx.lineTo(px, py);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isActive]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          className="fixed inset-0 z-[99999] bg-black pointer-events-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <canvas ref={canvasRef} className="w-full h-full block" />
          <div className="absolute inset-0 flex flex-col items-center justify-center font-mono text-emerald-400 gap-3 bg-black/35 select-none pointer-events-none">
            <span className="text-sm tracking-[0.4em] uppercase font-bold animate-pulse">
              Engaging Spacefold Drive
            </span>
            <div className="w-48 h-px bg-emerald-500/20 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 bg-emerald-400"
                initial={{ left: '-100%', width: '100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 1.0, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TransitionOverlay;
