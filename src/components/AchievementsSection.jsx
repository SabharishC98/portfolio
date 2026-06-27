import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const RANK_COLORS = {
  '1st': { bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)', text: '#ffffff', glow: 'none' },
  '2nd': { bg: 'rgba(255,255,255,0.03)', border: 'rgba(255,255,255,0.08)', text: '#aaaaaa', glow: 'none' },
};

const AchievementsSection = ({ proMode }) => {
  const { achievements, certifications } = portfolioData;
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section 
      id="achievements" 
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
            06 — Achievements
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
          <span className={proMode ? 'text-emerald-500/70 font-condensed' : 'gradient-text font-condensed'}>Wins</span>
        </motion.h2>

        {/* Achievement grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
          {achievements.map((item, i) => {
            const colors = RANK_COLORS[item.rank] || RANK_COLORS['1st'];
            return (
              <AchievementCard
                key={i}
                item={item}
                index={i}
                inView={inView}
                colors={colors}
                proMode={proMode}
              />
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 
            className={`font-display font-semibold text-xl mb-6 flex items-center gap-3 transition-colors duration-500 ${
              proMode ? 'text-emerald-400' : 'text-[#F0F0F0]'
            }`}
          >
            <span 
              className={`w-8 h-px transition-all duration-500 ${
                proMode 
                  ? 'bg-gradient-to-r from-emerald-500/40 to-transparent' 
                  : 'bg-gradient-to-r from-white to-transparent'
              }`} 
            />
            Certifications
          </h3>
          <div className="flex flex-wrap gap-4">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 + 0.7 }}
                onMouseEnter={() => {
                  if (proMode) {
                    window.dispatchEvent(
                      new CustomEvent('hud-log', { detail: `SCAN: CERT // ${cert.name.toUpperCase()}` })
                    );
                  }
                }}
                className={`flex items-center gap-3 px-6 py-4 glass rounded-xl glass-hover transition-all duration-500 ${
                  proMode ? 'pro-card-border bg-[#030d07]/30 text-emerald-400' : ''
                }`}
              >
                <span 
                  className={`text-lg transition-colors duration-500 ${
                    proMode ? 'text-emerald-400 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]' : 'text-white'
                  }`}
                >
                  ✦
                </span>
                <div>
                  <div 
                    className={`font-display font-semibold text-sm transition-colors duration-500 ${
                      proMode ? 'text-emerald-400' : 'text-[#F0F0F0]'
                    }`}
                  >
                    {cert.name}
                  </div>
                  <div 
                    className={`text-xs font-body transition-colors duration-500 ${
                      proMode ? 'text-emerald-500/50' : 'text-[#888888]'
                    }`}
                  >
                    {cert.issuer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ── Individual card with hover-reveal image ── */
const AchievementCard = ({ item, index, inView, colors, proMode }) => {
  const base = import.meta.env.BASE_URL;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.08 + 0.2,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => {
        if (proMode) {
          window.dispatchEvent(
            new CustomEvent('hud-log', { detail: `SCAN: WIN // ${item.event.toUpperCase()}` })
          );
        }
      }}
      className={`achievement-card glass rounded-2xl overflow-hidden transition-all duration-500 group relative ${
        proMode ? 'pro-card-border bg-[#030d07]/30 text-emerald-400' : ''
      }`}
      style={proMode ? {} : { boxShadow: colors.glow }}
    >
      {/* Hover image overlay — only for cards that have an image */}
      {item.image && (
        <div
          className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ pointerEvents: 'none' }}
        >
          <img
            src={`${base}${item.image}`}
            alt={item.event}
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay so text stays legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
        </div>
      )}

      {/* Card content — always on top */}
      <div className="relative z-20 p-6">
        {/* Rank badge */}
        <div className="mb-4 flex items-center">
          <span
            className={`text-xs font-display font-bold px-3 py-1 rounded-full transition-colors duration-500 ${
              proMode 
                ? 'bg-emerald-950/20 border border-emerald-500/30 text-emerald-400' 
                : ''
            }`}
            style={proMode ? {} : {
              background: colors.bg,
              border: `1px solid ${colors.border}`,
              color: colors.text,
            }}
          >
            {item.rank}
          </span>
        </div>

        <h3 
          className={`font-display font-bold text-lg mb-2 leading-tight transition-colors duration-500 ${
            proMode ? 'text-emerald-400' : 'text-[#F0F0F0]'
          }`}
        >
          {item.event}
        </h3>
        <p 
          className={`text-sm font-body transition-colors duration-500 ${
            proMode ? 'text-emerald-500/60' : 'text-[#888888]'
          }`}
        >
          {item.org}
        </p>

        {/* Accent bar */}
        <div
          className="mt-4 h-px transition-all duration-500"
          style={{ 
            background: proMode
              ? 'linear-gradient(90deg, rgba(16,185,129,0.3), transparent)'
              : `linear-gradient(90deg, ${colors.text}40, transparent)` 
          }}
        />

        {/* "View photo" hint — only shows on hover for cards with images */}
        {item.image && (
          <p className="mt-3 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white/70 font-mono tracking-widest">
            ↑ EVENT PHOTO
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default AchievementsSection;
