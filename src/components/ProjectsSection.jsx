import { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const CARD_GRADIENTS = [
  'from-white/[0.03] to-transparent',
  'from-white/[0.01] to-transparent',
  'from-white/[0.02] to-transparent',
];

const ProjectCard = ({ project, index, inView, proMode }) => {
  const cardRef = useRef(null);

  // 3D tilt effect
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -10;
      const rotY = ((x - cx) / cx) * 10;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
    };

    const onLeave = () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15 + 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => {
        if (proMode) {
          window.dispatchEvent(
            new CustomEvent('hud-log', { detail: `SCAN: PROJECT // ${project.title.toUpperCase()}` })
          );
        }
      }}
      className={`project-card glass rounded-2xl overflow-hidden relative group transition-all duration-500 ${
        proMode ? 'pro-card-border bg-[#030d07]/30' : ''
      }`}
      style={{ transition: 'transform 0.15s ease, box-shadow 0.3s ease' }}
    >
      {/* Gradient top overlay */}
      {!proMode && (
        <div className={`absolute inset-0 bg-gradient-to-br ${CARD_GRADIENTS[index % CARD_GRADIENTS.length]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
      )}

      {/* Glow border on hover */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: proMode
            ? 'inset 0 0 0 1px rgba(16,185,129,0.3), 0 0 25px rgba(16,185,129,0.08)'
            : 'inset 0 0 0 1px rgba(255,255,255,0.1), 0 0 30px rgba(255,255,255,0.03)',
        }}
      />

      <div className="p-8 relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex gap-2 mb-3 flex-wrap">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`text-[10px] px-3 py-1 rounded-full font-mono uppercase tracking-wider transition-colors duration-500 ${
                    proMode 
                      ? 'bg-emerald-950/20 border border-emerald-500/30 text-emerald-400' 
                      : 'text-[#ffffff]'
                  }`}
                  style={proMode ? {} : {
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <h3 
              className={`font-display font-bold text-2xl transition-all duration-300 ${
                proMode 
                  ? 'text-emerald-400 group-hover:text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]' 
                  : 'text-[#F0F0F0] group-hover:gradient-text'
              }`}
            >
              {project.title}
            </h3>
          </div>

          {/* Arrow link */}
          {!project.inDevelopment && project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => {
                if (proMode) {
                  window.dispatchEvent(
                    new CustomEvent('hud-log', { detail: `LOCK: PROJ_LINK // ${project.title.toUpperCase()}` })
                  );
                }
              }}
              className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border transition-all ml-4 ${
                proMode 
                  ? 'border-emerald-500/30 text-emerald-400 hover:border-emerald-400 hover:bg-emerald-950/30' 
                  : 'border-white/10 text-[#888888] hover:border-white hover:text-white'
              }`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 13L13 3M13 3H7M13 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
        </div>

        {/* Description */}
        <p 
          className={`text-sm leading-relaxed mb-6 font-body whitespace-pre-line transition-colors duration-500 ${
            proMode ? 'text-emerald-500/70' : 'text-[#888888]'
          }`}
        >
          {project.description}
        </p>

        {/* Stack pills */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className={`text-xs px-2.5 py-1 rounded-md font-mono transition-colors duration-500 ${
                proMode 
                  ? 'bg-emerald-950/10 border border-emerald-500/20 text-emerald-400/80' 
                  : 'text-[#888888]'
              }`}
              style={proMode ? {} : {
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Year & Actions */}
        <div 
          className={`mt-6 pt-5 border-t flex items-center justify-end transition-colors duration-500 ${
            proMode ? 'border-emerald-500/10' : 'border-white/[0.06]'
          }`}
        >
          {project.inDevelopment ? (
            <span className="text-[10px] font-mono tracking-widest uppercase text-white/40 animate-pulse select-none">
              ◈ Being Built
            </span>
          ) : (
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className={`text-xs font-display flex items-center gap-1 transition-colors ${
                proMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-white hover:text-[#7f7f7f]'
              }`}
            >
              View on GitHub
              <span>→</span>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = ({ proMode }) => {
  const { projects } = portfolioData;
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true });
  const scrollRef = useRef(null);

  // Draggable horizontal scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let isDown = false;
    let startX;
    let scrollLeft;

    const onDown = (e) => {
      isDown = true;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
    };
    const onUp = () => { isDown = false; };
    const onMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - el.offsetLeft;
      const walk = (x - startX) * 2;
      el.scrollLeft = scrollLeft - walk;
    };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mouseleave', onUp);
    el.addEventListener('mouseup', onUp);
    el.addEventListener('mousemove', onMove);

    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mouseleave', onUp);
      el.removeEventListener('mouseup', onUp);
      el.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section 
      id="projects" 
      className={`relative py-28 md:py-40 transition-colors duration-700 ${
        proMode ? 'bg-[#030705]' : 'bg-[#000000]'
      }`} 
      ref={ref}
    >
      <div 
        className={`absolute top-0 left-0 right-0 h-px transition-colors duration-700 ${
          proMode 
            ? 'bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
        }`} 
      />

      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span 
            className={`section-tag transition-colors duration-500 ${
              proMode ? 'text-emerald-500/80 font-mono' : ''
            }`}
          >
            03 — Projects
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end justify-between mb-12"
        >
          <h2 
            className={`section-title font-condensed uppercase tracking-tight mb-12 leading-[1.0] transition-colors duration-500 ${
              proMode ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'text-white'
            }`}
          >
            Selected <span className={proMode ? 'text-emerald-500/70' : 'gradient-text'}>Work</span>
          </h2>
          <p 
            className={`hidden md:block text-sm font-body transition-colors duration-500 ${
              proMode ? 'text-emerald-500/40 font-mono' : 'text-[#888888]'
            }`}
          >
            {proMode ? 'DRAG_TO_DISCOVER // HUD_EXPLORE' : 'Drag to explore →'}
          </p>
        </motion.div>
      </div>

      {/* Desktop: horizontal scroll | Mobile: vertical stack */}
      <div className="hidden md:block">
        <div
          ref={scrollRef}
          className="h-scroll-container flex gap-6 px-6 md:px-16"
          style={{ paddingRight: '4rem' }}
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} proMode={proMode} />
          ))}
          {/* Spacer */}
          <div className="flex-shrink-0 w-8" />
        </div>
      </div>

      {/* Mobile: vertical */}
      <div className="md:hidden flex flex-col gap-6 px-6">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} inView={inView} proMode={proMode} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;

