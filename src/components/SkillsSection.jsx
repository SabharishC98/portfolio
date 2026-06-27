import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const SkillsSection = ({ proMode }) => {
  const { skills } = portfolioData;
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="skills" 
      className={`relative py-28 md:py-40 px-6 md:px-16 transition-colors duration-700 ${
        proMode ? 'bg-[#050a07]' : 'bg-[#050505]'
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
            02 — Skills
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`section-title font-condensed uppercase tracking-tight mb-16 leading-[1.0] transition-colors duration-500 ${
            proMode ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'text-white'
          }`}
        >
          My <span className={proMode ? 'text-emerald-500/70' : 'gradient-text'}>Arsenal</span>
        </motion.h2>

        <div className="space-y-10">
          {skills.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: gi * 0.08 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8"
            >
              {/* Category label */}
              <div className="sm:w-40 flex-shrink-0 pt-1">
                <span 
                  className={`text-xs font-mono uppercase tracking-widest transition-colors duration-500 ${
                    proMode ? 'text-emerald-400/70' : 'text-[#888888]'
                  }`}
                >
                  {group.category}
                </span>
              </div>

              {/* Pills */}
              <div className="flex flex-wrap gap-3">
                {group.items.map((skill, si) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: gi * 0.08 + si * 0.04 + 0.3,
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                    }}
                    onMouseEnter={() => {
                      if (proMode) {
                        window.dispatchEvent(
                          new CustomEvent('hud-log', { detail: `SCAN: TECH // ${skill.toUpperCase()}` })
                        );
                      }
                    }}
                    className={`skill-pill px-4 py-2 rounded-full text-sm font-body transition-all duration-300 ${
                      proMode 
                        ? '!border-emerald-500/25 bg-emerald-950/10 !text-emerald-400/80 hover:!border-emerald-400 hover:!text-emerald-300 hover:bg-emerald-900/30 hover:scale-105 hover:-translate-y-1' 
                        : 'border border-white/10 text-[#888888] hover:border-white hover:text-white hover:bg-white/5 hover:scale-105 hover:-translate-y-1 shadow-[0_4px_12px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.05)]'
                    }`}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="mt-20 h-px origin-left"
          style={{ 
            background: proMode
              ? 'linear-gradient(90deg, rgba(16,185,129,0.2), transparent)'
              : 'linear-gradient(90deg, rgba(255,255,255,0.1), transparent)' 
          }}
        />
      </div>
    </section>
  );
};

export default SkillsSection;
