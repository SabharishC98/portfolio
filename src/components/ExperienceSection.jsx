import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const TimelineEntry = ({ entry, index, totalInView, proMode }) => {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-start gap-8 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
      {/* Desktop spacer column */}
      <div className="hidden md:block md:w-1/2" />

      {/* Center dot */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 flex-col items-center">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={totalInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
          className={`w-4 h-4 rounded-full border-2 bg-[#000000] transition-colors duration-500 ${
            proMode ? 'border-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'border-white'
          }`}
          style={{ 
            boxShadow: proMode 
              ? '0 0 10px rgba(16,185,129,0.5)' 
              : '0 0 10px rgba(255,255,255,0.3)' 
          }}
        />
      </div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={totalInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.2, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => {
          if (proMode) {
            window.dispatchEvent(
              new CustomEvent('hud-log', { detail: `SCAN: CAREER // ${entry.company.toUpperCase()}` })
            );
          }
        }}
        className={`w-full md:w-1/2 glass rounded-2xl p-7 glass-hover transition-all duration-500 ${
          proMode ? 'pro-card-border bg-[#030d07]/30 text-emerald-400' : ''
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 
              className={`font-display font-bold text-lg mb-1 transition-colors duration-500 ${
                proMode ? 'text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.3)]' : 'text-[#F0F0F0]'
              }`}
            >
              {entry.role}
            </h3>
            <p 
              className={`font-display font-semibold text-base transition-colors duration-500 ${
                proMode ? 'text-emerald-500/70' : 'gradient-text'
              }`}
            >
              {entry.company}
            </p>
          </div>
          <div className="text-right flex-shrink-0 ml-4">
            <div 
              className={`text-xs font-mono mb-1 transition-colors duration-500 ${
                proMode ? 'text-emerald-400' : 'text-white'
              }`}
            >
              {entry.period}
            </div>
            <div 
              className={`text-xs font-body transition-colors duration-500 ${
                proMode ? 'text-emerald-500/50' : 'text-[#7f7f7f]'
              }`}
            >
              {entry.location}
            </div>
          </div>
        </div>

        <ul className="space-y-2 mt-4">
          {entry.points.map((point, pi) => (
            <li 
              key={pi} 
              className={`flex items-start gap-3 text-sm font-body leading-relaxed transition-colors duration-500 ${
                proMode ? 'text-emerald-500/80' : 'text-[#888888]'
              }`}
            >
              <span 
                className={`mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors duration-500 ${
                  proMode ? 'bg-emerald-400 shadow-[0_0_4px_rgba(16,185,129,0.8)]' : 'bg-white'
                }`} 
              />
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const ExperienceSection = ({ proMode }) => {
  const { experience } = portfolioData;
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="experience" 
      className={`relative py-28 md:py-40 px-6 md:px-16 transition-colors duration-700 ${
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

      <div className="max-w-7xl mx-auto">
        {/* Section tag */}
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
            04 — Experience
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`section-title font-condensed uppercase tracking-tight mb-20 leading-[1.0] transition-colors duration-500 ${
            proMode ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'text-white'
          }`}
        >
          Where I've <span className={proMode ? 'text-emerald-500/70' : 'gradient-text'}>Been</span>
        </motion.h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`w-full h-full origin-top timeline-line transition-all duration-700 ${
                proMode ? '!bg-emerald-500/20' : ''
              }`}
            />
          </div>

          {/* Mobile: left line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.3 }}
              className={`w-full h-full origin-top timeline-line transition-all duration-700 ${
                proMode ? '!bg-emerald-500/20' : ''
              }`}
            />
          </div>

          <div className="space-y-12 md:space-y-16 pl-10 md:pl-0">
            {experience.map((entry, i) => (
              <TimelineEntry key={i} entry={entry} index={i} totalInView={inView} proMode={proMode} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
