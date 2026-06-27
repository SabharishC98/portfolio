import { Suspense, lazy, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const ParticleCanvas = lazy(() => import('./ParticleCanvas'));

const HeroSection = ({ proMode }) => {
  const { personal } = portfolioData;
  const btnRef1 = useRef(null);
  const btnRef2 = useRef(null);

  // Magnetic button effect
  useEffect(() => {
    const applyMagnetic = (btn) => {
      if (!btn) return;
      const onMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      };
      const onLeave = () => {
        btn.style.transform = 'translate(0, 0)';
      };
      btn.addEventListener('mousemove', onMove);
      btn.addEventListener('mouseleave', onLeave);
      return () => {
        btn.removeEventListener('mousemove', onMove);
        btn.removeEventListener('mouseleave', onLeave);
      };
    };

    const clean1 = applyMagnetic(btnRef1.current);
    const clean2 = applyMagnetic(btnRef2.current);
    return () => {
      clean1?.();
      clean2?.();
    };
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    window.dispatchEvent(new CustomEvent('hud-log', { detail: 'ACTION: SCROLL_TO_PROJECTS' }));
  };

  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-start overflow-hidden bg-[#000000] py-20"
    >
      {/* Particle Background */}
      <Suspense fallback={null}>
        <div className="absolute inset-0 z-0">
          <ParticleCanvas proMode={proMode} />
        </div>
      </Suspense>

      {/* Radial glow blobs */}
      <div
        className="hero-glow"
        style={{ top: '20%', left: '10%', opacity: proMode ? 0.02 : 0.1 }}
      />
      <div
        className="hero-glow"
        style={{
          bottom: '15%',
          right: '5%',
          opacity: proMode ? 0.01 : 0.05,
          background: proMode
            ? 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 px-6 md:px-16 max-w-7xl w-full mx-auto pt-24 md:pt-12 text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow tag */}
        <motion.div variants={itemVariants} className="mb-8">
          <span 
            className={`section-tag font-mono text-xs tracking-[0.3em] uppercase transition-colors duration-500 ${
              proMode ? 'text-emerald-500/80' : 'text-[#7f7f7f]'
            }`}
          >
            ◈ Available for opportunities
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="hero-title font-condensed uppercase select-none mb-6 overflow-hidden flex flex-col leading-[0.9] tracking-tighter">
          <motion.div 
            variants={itemVariants} 
            className={`transition-colors duration-500 ${
              proMode ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'text-white'
            }`}
          >
            Building Intelligent
          </motion.div>
          <motion.div 
            variants={itemVariants} 
            className={`transition-colors duration-500 ${
              proMode ? 'text-emerald-950/60' : 'text-[#333333]'
            }`}
          >
            Systems Designed To
          </motion.div>
          <motion.div 
            variants={itemVariants} 
            className={`transition-colors duration-500 ${
              proMode ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'text-white'
            }`}
          >
            Transform Complex Logic
          </motion.div>
          <motion.div 
            variants={itemVariants} 
            className={`transition-colors duration-500 ${
              proMode ? 'text-emerald-950/60' : 'text-[#333333]'
            }`}
          >
            Into Secure Visual Action.
          </motion.div>
        </div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className={`text-xs font-mono uppercase tracking-[0.2em] mb-12 mt-6 max-w-xl leading-relaxed transition-colors duration-500 ${
            proMode ? 'text-emerald-500/60' : 'text-[#7f7f7f]'
          }`}
        >
          Stripping away interface noise to deliver maximum focus, speed, and compositional discipline.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemVariants} className="flex flex-wrap gap-5 items-center">
          <button
            ref={btnRef1}
            onClick={scrollToProjects}
            className={`magnetic-btn px-8 py-4 font-display font-bold text-xs uppercase tracking-[0.1em] transition-all duration-500 rounded-full ${
              proMode
                ? 'bg-emerald-950/20 border border-emerald-500/50 text-emerald-400 hover:bg-emerald-500 hover:text-black shadow-[0_0_15px_rgba(16,185,129,0.25)]'
                : 'bg-white text-black hover:bg-black hover:text-white border border-white'
            }`}
            style={{
              boxShadow: proMode ? 'none' : '0 4px 20px rgba(255,255,255,0.15)',
            }}
          >
            View Projects
          </button>

          <a
            href={personal.resume}
            download
            ref={btnRef2}
            onClick={() => window.dispatchEvent(new CustomEvent('hud-log', { detail: 'ACTION: DOWNLOAD_RESUME' }))}
            className={`magnetic-btn px-8 py-4 font-display font-bold text-xs uppercase tracking-[0.1em] transition-all duration-500 rounded-full ${
              proMode
                ? 'bg-transparent border border-emerald-500/30 text-emerald-500/60 hover:border-emerald-500 hover:text-emerald-400'
                : 'border border-white/20 text-white hover:border-white hover:bg-white hover:text-black'
            }`}
          >
            Download Resume ↗
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className={`flex gap-12 mt-16 pt-10 border-t transition-colors duration-500 ${
            proMode ? 'border-emerald-500/10' : 'border-white/[0.05]'
          }`}
        >
          {portfolioData.stats.map((stat) => (
            <div key={stat.label}>
              <div 
                className={`font-condensed font-bold text-4xl md:text-5xl transition-colors duration-500 ${
                  proMode ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.25)]' : 'text-white'
                }`}
              >
                {stat.value}
              </div>
              <div 
                className={`text-[10px] font-mono uppercase tracking-widest mt-2 transition-colors duration-500 ${
                  proMode ? 'text-emerald-500/40' : 'text-[#7f7f7f]'
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span 
          className={`text-[10px] tracking-[0.3em] font-mono transition-colors duration-500 ${
            proMode ? 'text-emerald-500/40' : 'text-[#555555]'
          }`}
        >
          SCROLL
        </span>
        <div className="scroll-indicator">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path 
              d="M10 4v12M5 11l5 5 5-5" 
              stroke={proMode ? '#10b981' : '#333333'} 
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
