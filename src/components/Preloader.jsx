import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let current = 0;
    const total = 100;
    const duration = 2200;
    const stepTime = duration / total;

    const timer = setInterval(() => {
      current += 1;
      setCount(current);
      if (current >= total) {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 800);
        }, 300);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background glitching monogram */}
          <div className="preloader-monogram select-none">SC</div>

          {/* Counter */}
          <motion.div
            className="relative z-10 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="preloader-counter gradient-text">
              {String(count).padStart(2, '0')}
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-white to-[#555555]"
                style={{ width: `${count}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>

            <p className="font-mono text-xs text-[#888888] tracking-[0.3em] uppercase">
              Loading Portfolio
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
