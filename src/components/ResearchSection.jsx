import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const ResearchSection = ({ proMode }) => {
  const { research } = portfolioData;
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="research" 
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
            05 — Research
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
          Research <span className={proMode ? 'text-emerald-500/70' : 'gradient-text'}>&</span> Work
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {research.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 + 0.2, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => {
                if (proMode) {
                  window.dispatchEvent(
                    new CustomEvent('hud-log', { detail: `SCAN: RESEARCH // ${item.title.toUpperCase()}` })
                  );
                }
              }}
              className={`glass rounded-2xl p-8 glass-hover relative overflow-hidden transition-all duration-500 ${
                proMode ? 'pro-card-border bg-[#030d07]/30 text-emerald-400' : ''
              }`}
            >
              {/* Paper texture top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-2xl transition-all duration-500"
                style={{
                  background: proMode
                    ? 'linear-gradient(90deg, #10b981, #064e3b)'
                    : 'linear-gradient(90deg, #ffffff, #555555)',
                }}
              />

              {/* Year badge */}
              <div className="flex items-center justify-between mb-5">
                <span 
                  className={`text-xs font-mono px-3 py-1 rounded-full border transition-all duration-500 ${
                    proMode ? 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20' : 'text-[#888888] border-white/10'
                  }`}
                >
                  {item.year}
                </span>
                <div className="flex gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-0.5 rounded font-mono transition-colors duration-500 ${
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
              </div>

              <h3 
                className={`font-display font-bold text-xl mb-3 leading-tight transition-colors duration-500 ${
                  proMode ? 'text-emerald-400' : 'text-[#F0F0F0]'
                }`}
              >
                {item.title}
              </h3>

              <p 
                className={`text-xs font-mono mb-4 flex items-center gap-2 transition-colors duration-500 ${
                  proMode ? 'text-emerald-500/70' : 'text-white'
                }`}
              >
                <span 
                  className={`w-1.5 h-1.5 rounded-full inline-block transition-colors duration-500 ${
                    proMode ? 'bg-emerald-400 shadow-[0_0_4px_rgba(16,185,129,0.8)]' : 'bg-white'
                  }`} 
                />
                {item.org}
              </p>

              <p 
                className={`text-sm leading-relaxed font-body transition-colors duration-500 ${
                  proMode ? 'text-emerald-500/80' : 'text-[#888888]'
                }`}
              >
                {item.summary}
              </p>

              {/* Corner decoration */}
              <div
                className="absolute bottom-0 right-0 w-24 h-24 opacity-5 rounded-tl-full transition-all duration-500"
                style={{
                  background: proMode
                    ? 'linear-gradient(135deg, #10b981, #064e3b)'
                    : 'linear-gradient(135deg, #ffffff, #555555)',
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
