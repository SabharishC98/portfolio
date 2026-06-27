import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ViewportFrame = ({ proMode }) => {
  const [time, setTime] = useState('');
  const [battery, setBattery] = useState(98);

  useEffect(() => {
    // Clock update
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Slow battery depletion simulation
    const interval = setInterval(() => {
      setBattery(prev => {
        if (prev <= 10) return 98; // Reset
        return prev - 1;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Outer borders framing the screen */}
      <div className={`fixed inset-0 pointer-events-none z-[8000] transition-all duration-700 ${
        proMode 
          ? 'border-[12px] md:border-[16px] border-[#0c1f19] shadow-[inset_0_0_40px_rgba(16,185,129,0.15)]'
          : 'border-0'
      }`}>
        {/* Glowing border line */}
        <div className={`absolute inset-0 transition-all duration-700 ${
          proMode 
            ? 'border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]' 
            : 'border-[8px] md:border-[12px] border-transparent'
        }`} />
      </div>

      {/* Decorative corner brackets (visible in normal mode as cyan/blue, in pro mode as green cyber-accents) */}
      {!proMode ? (
        // Monochrome styled viewport accents
        <div className="fixed inset-0 pointer-events-none z-[8005]">
          {/* Subtle vignette around the screen */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(255,255,255,0.02)]" />
          
          {/* Corner tick lines */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/10" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/10" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/10" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/10" />
          
          {/* Top center system label */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[9px] text-white/10 tracking-[0.4em] uppercase hidden md:block">
            SYSTEM // READY
          </div>
        </div>
      ) : (
        // Bilal Space Cockpit HUD overlays
        <div className="fixed inset-0 pointer-events-none z-[8005] font-mono text-[10px] text-emerald-400 select-none p-4 md:p-6">
          {/* Scanline CRT overlay with flicker */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%),_linear-gradient(90deg,_rgba(255,0,0,0.06),_rgba(0,255,0,0.02),_rgba(0,0,255,0.06))] bg-[size:100%_4px,_6px_100%] opacity-40 mix-blend-overlay animate-[flicker_0.15s_infinite]" />

          {/* Glowing HUD corners */}
          <div className="absolute top-4 left-4 flex flex-col gap-1">
            <span className="text-emerald-500 font-bold">◈ SYS_LINK // SECURE</span>
            <span className="text-emerald-500/60">NODE: SC_PORTFOLIO</span>
          </div>

          <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
            <span className="text-emerald-500 font-bold">{time}</span>
            <span className="text-emerald-500/60">PWR_LVL: {battery}%</span>
          </div>

          {/* Coordinates (Coimbatore coordinates) */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-1 hidden md:block">
            <span className="text-emerald-500/60">LAT: 11°01'N</span>
            <span className="text-emerald-500/60">LON: 76°58'E</span>
          </div>

          {/* Tech parameters */}
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-1 hidden md:block">
            <span className="text-emerald-500/60">GRID_ALIGN: ACTIVE</span>
            <span className="text-emerald-500/60">SYS_TEMP: 38°C</span>
          </div>

          {/* Reticle brackets around central viewport */}
          <div className="absolute inset-[15%] md:inset-[20%] border border-emerald-500/[0.03] rounded-3xl flex items-center justify-between">
            <div className="w-4 h-4 border-t border-l border-emerald-500/20 -mt-1 -ml-1 rounded-tl-lg" />
            <div className="w-4 h-4 border-t border-r border-emerald-500/20 -mt-1 -mr-1 rounded-tr-lg" />
            <div className="w-4 h-4 border-b border-l border-emerald-500/20 -mb-1 -ml-1 rounded-bl-lg" />
            <div className="w-4 h-4 border-b border-r border-emerald-500/20 -mb-1 -mr-1 rounded-br-lg" />
          </div>
        </div>
      )}
    </>
  );
};

export default ViewportFrame;
