import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HudOverlay = ({ proMode }) => {
  const [logs, setLogs] = useState([]);
  const [cpu, setCpu] = useState(12.4);
  const [ping, setPing] = useState(24);
  
  // Audio state
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioCtxRef = useRef(null);
  const synthNodesRef = useRef(null);

  // Terminal log listener
  useEffect(() => {
    // Initial boot logs
    const bootSequence = [
      'SYS INITIALIZATION RUN...',
      'CONNECTING TO SABHARISH_DEV...',
      'PORTFOLIO STATUS: ONLINE',
      'DECOMPRESSING BIO SCHEMATICS...',
      'LLM SECURITY GUARDRAILS ACTIVE',
      'COCKPIT TERMINAL DEPLOYED.'
    ];

    bootSequence.forEach((msg, idx) => {
      setTimeout(() => {
        setLogs(prev => [...prev.slice(-6), `[SYS] ${msg}`]);
      }, idx * 600);
    });

    const handleHudLog = (e) => {
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      setLogs(prev => [...prev.slice(-6), `[${timestamp}] ${e.detail}`]);
    };

    window.addEventListener('hud-log', handleHudLog);
    return () => {
      window.removeEventListener('hud-log', handleHudLog);
    };
  }, []);

  // Telemetry fluctuation
  useEffect(() => {
    if (!proMode) return;
    const interval = setInterval(() => {
      setCpu(parseFloat((10 + Math.random() * 8).toFixed(1)));
      setPing(Math.floor(22 + Math.random() * 6));
    }, 2000);
    return () => clearInterval(interval);
  }, [proMode]);

  // Audio hum synth using Web Audio API
  const toggleAmbientHum = () => {
    if (audioPlaying) {
      // Stop audio
      if (synthNodesRef.current) {
        try {
          synthNodesRef.current.osc1.stop();
          synthNodesRef.current.osc2.stop();
        } catch (e) {}
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
      setAudioPlaying(false);
      window.dispatchEvent(new CustomEvent('hud-log', { detail: 'AUDIO: AMBIENT_HUM DEACTIVATED' }));
    } else {
      // Start audio
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const ctx = new AudioContext();
        audioCtxRef.current = ctx;

        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        const filterNode = ctx.createBiquadFilter();

        osc1.type = 'sine';
        osc1.frequency.value = 55; // Low A (bass hum)

        osc2.type = 'triangle';
        osc2.frequency.value = 110; // A octave higher for warmth

        filterNode.type = 'lowpass';
        filterNode.frequency.value = 80; // Filter out high harsh frequencies

        gainNode.gain.value = 0.05; // Very subtle hum

        // Connect nodes
        osc1.connect(filterNode);
        osc2.connect(filterNode);
        filterNode.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();

        synthNodesRef.current = { osc1, osc2, gainNode };
        setAudioPlaying(true);
        window.dispatchEvent(new CustomEvent('hud-log', { detail: 'AUDIO: AMBIENT_HUM RUNNING // 55Hz' }));
      } catch (err) {
        console.warn('Web Audio synthesis failed:', err);
      }
    }
  };

  // Clean up synth on unmount
  useEffect(() => {
    return () => {
      if (synthNodesRef.current) {
        try {
          synthNodesRef.current.osc1.stop();
          synthNodesRef.current.osc2.stop();
        } catch (e) {}
      }
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const handleOrbitalClick = (id, label) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      window.dispatchEvent(
        new CustomEvent('hud-log', { detail: `NAV: ORBIT_NODE_ENGAGED // ${label.toUpperCase()}` })
      );
    }
  };

  if (!proMode) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[8100] hidden md:block">
      {/* 1. TOP-LEFT: Diagnostic Terminal */}
      <div className="absolute top-20 left-6 w-72 pointer-events-auto bg-[#0a1411]/80 border border-emerald-500/30 p-3 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.05)] backdrop-blur-md">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5 mb-2">
          <span className="font-mono text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
            Diagnostic Console
          </span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
          </div>
        </div>
        <div className="font-mono text-[9px] text-emerald-400/90 space-y-1 h-32 overflow-y-auto scrollbar-none select-none">
          {logs.map((log, i) => (
            <div key={i} className="whitespace-nowrap overflow-hidden text-ellipsis leading-relaxed">
              {log}
            </div>
          ))}
        </div>
      </div>

      {/* 2. TOP-RIGHT: Telemetry Widget */}
      <div className="absolute top-20 right-6 w-60 pointer-events-auto bg-[#0a1411]/80 border border-emerald-500/30 p-3 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.05)] backdrop-blur-md">
        <div className="border-b border-emerald-500/20 pb-1.5 mb-2.5">
          <span className="font-mono text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
            Telemetry Dashboard
          </span>
        </div>
        <div className="font-mono text-[10px] text-emerald-400 space-y-2 select-none">
          <div className="flex justify-between items-center">
            <span className="text-emerald-500/60">SYS_CPU:</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-1.5 bg-emerald-950 border border-emerald-500/20 rounded-sm overflow-hidden relative">
                <div 
                  className="h-full bg-emerald-500" 
                  style={{ width: `${(cpu / 20) * 100}%` }}
                />
              </div>
              <span className="w-8 text-right font-bold">{cpu}%</span>
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-emerald-500/60">SYS_PING:</span>
            <span className="font-bold">{ping}ms</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-emerald-500/60">SYS_MODE:</span>
            <span className="font-bold text-emerald-500 animate-pulse">PRO // COCKPIT</span>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM-LEFT: Orbital Node Navigator */}
      <div className="absolute bottom-6 left-6 pointer-events-auto bg-[#0a1411]/80 border border-emerald-500/30 p-3 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.05)] backdrop-blur-md w-44 flex flex-col items-center">
        <span className="font-mono text-[9px] font-bold text-emerald-500 uppercase tracking-widest mb-2 border-b border-emerald-500/20 w-full pb-1 text-center select-none">
          Orbital Map
        </span>
        <div className="relative w-28 h-28 flex items-center justify-center">
          {/* Outer orbit circle */}
          <div className="absolute w-24 h-24 border border-dashed border-emerald-500/20 rounded-full animate-[spin_40s_linear_infinite]" />
          {/* Inner orbit circle */}
          <div className="absolute w-16 h-16 border border-dotted border-emerald-500/10 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
          
          {/* Central Core Node */}
          <div 
            className="absolute z-10 w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500 flex items-center justify-center cursor-pointer shadow-[0_0_10px_rgba(16,185,129,0.4)]"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="font-mono text-[9px] font-bold text-emerald-400">SC</span>
          </div>

          {/* Planet Nodes around orbit */}
          {[
            { angle: 0, id: '#about', label: 'ABT' },
            { angle: 60, id: '#skills', label: 'SKL' },
            { angle: 120, id: '#projects', label: 'PRJ' },
            { angle: 180, id: '#experience', label: 'EXP' },
            { angle: 240, id: '#research', label: 'RES' },
            { angle: 300, id: '#contact', label: 'CNT' },
          ].map((node) => {
            const radius = 46; // radius of orbit
            const rad = (node.angle * Math.PI) / 180;
            const x = radius * Math.cos(rad);
            const y = radius * Math.sin(rad);

            return (
              <button
                key={node.label}
                onClick={() => handleOrbitalClick(node.id, node.label)}
                onMouseEnter={() => {
                  window.dispatchEvent(
                    new CustomEvent('hud-log', { detail: `ORBIT: NODE_LOCKED // ${node.label}` })
                  );
                }}
                className="absolute w-6 h-6 rounded-full bg-[#0a1411] border border-emerald-500/40 hover:border-emerald-400 hover:bg-emerald-950/80 flex items-center justify-center cursor-pointer transition-all duration-300 shadow-md group"
                style={{
                  transform: `translate(${x}px, ${y}px)`,
                }}
                title={node.id.substring(1).toUpperCase()}
              >
                <span className="font-mono text-[7px] text-emerald-400 group-hover:scale-110 font-semibold">{node.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. BOTTOM-RIGHT: Radar / Audio Ambient controller */}
      <div className="absolute bottom-6 right-6 pointer-events-auto bg-[#0a1411]/80 border border-emerald-500/30 p-3 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.05)] backdrop-blur-md w-52 select-none">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5 mb-2.5">
          <span className="font-mono text-[9px] font-bold text-emerald-500 uppercase tracking-widest">
            Acoustic Signal
          </span>
          <button
            onClick={toggleAmbientHum}
            className={`px-2 py-0.5 border rounded-sm font-mono text-[7px] transition-all duration-200 ${
              audioPlaying
                ? 'border-emerald-400 text-emerald-300 bg-emerald-950/50 shadow-[0_0_6px_rgba(52,211,153,0.3)]'
                : 'border-emerald-500/20 text-emerald-500/40 hover:border-emerald-500/40 hover:text-emerald-400'
            }`}
          >
            {audioPlaying ? 'MUTE HUM' : 'PLAY HUM'}
          </button>
        </div>
        
        {/* Animated Sound Wave Visualizer */}
        <div className="flex items-end justify-between h-8 px-2 py-1 mb-2 bg-[#050a09]/50 border border-emerald-500/10 rounded-sm">
          {Array.from({ length: 18 }).map((_, idx) => {
            // Speed and heights mapped dynamically
            const animDuration = [0.8, 1.2, 0.6, 1.0, 1.4, 0.5, 0.9, 1.1, 0.7][idx % 9];
            return (
              <div
                key={idx}
                className="w-1.5 bg-emerald-500/80 rounded-t-sm"
                style={{
                  height: audioPlaying ? '100%' : '15%',
                  animation: audioPlaying
                    ? `hudWave ${animDuration}s ease-in-out infinite alternate`
                    : 'none',
                  animationDelay: `${idx * 0.05}s`,
                }}
              />
            );
          })}
        </div>

        <div className="font-mono text-[8px] text-emerald-500/50 flex justify-between">
          <span>SRC: 55HZ / 110HZ</span>
          <span className="animate-pulse">{audioPlaying ? 'SIGNAL_OUT' : 'SIGNAL_MUTED'}</span>
        </div>
      </div>

      {/* CSS Keyframe Injection for Wave Animation */}
      <style>{`
        @keyframes hudWave {
          0% { height: 10%; }
          100% { height: 95%; }
        }
      `}</style>
    </div>
  );
};

export default HudOverlay;
