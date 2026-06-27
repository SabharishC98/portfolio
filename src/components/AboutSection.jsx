import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const AboutSection = ({ proMode }) => {
  const { personal, stats } = portfolioData;
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 50 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section 
      id="about" 
      className={`relative py-28 md:py-40 px-6 md:px-16 transition-colors duration-700 ${
        proMode ? 'bg-[#030705]' : 'bg-[#000000]'
      }`} 
      ref={ref}
    >
      {/* Subtle section separator */}
      <div 
        className={`absolute top-0 left-0 right-0 h-px transition-colors duration-700 ${
          proMode 
            ? 'bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent' 
            : 'bg-gradient-to-r from-transparent via-white/10 to-transparent'
        }`} 
      />

      <div className="max-w-7xl mx-auto">
        {/* Section tag */}
        <motion.div {...fadeUp(0)} className="mb-12">
          <span 
            className={`section-tag transition-colors duration-500 ${
              proMode ? 'text-emerald-500/80 font-mono' : ''
            }`}
          >
            01 — About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: Stats + Heading */}
          <div>
            <motion.h2
              {...fadeUp(0.1)}
              className={`section-title font-condensed uppercase tracking-tight mb-10 leading-[1.0] transition-colors duration-500 ${
                proMode ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'text-white'
              }`}
            >
              Full-Stack
              <br />
              <span className={proMode ? 'text-emerald-500/70' : 'gradient-text'}>Developer</span>
              <br />
              & Researcher.
            </motion.h2>

            {/* Stat blocks */}
            <motion.div {...fadeUp(0.2)} className="grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className={`glass rounded-xl p-5 text-center glass-hover transition-all duration-500 ${
                    proMode ? 'pro-card-border bg-[#0b1b15]/20 text-emerald-400' : ''
                  }`}
                  onMouseEnter={() => {
                    if (proMode) {
                      window.dispatchEvent(
                        new CustomEvent('hud-log', { detail: `SCAN: STATS // ${stat.label.toUpperCase()}` })
                      );
                    }
                  }}
                >
                  <div 
                    className={`font-condensed font-bold text-3xl md:text-4xl mb-1 transition-colors duration-500 ${
                      proMode ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'text-white'
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div 
                    className={`text-[10px] uppercase tracking-wider font-mono leading-tight transition-colors duration-500 ${
                      proMode ? 'text-emerald-500/50' : 'text-[#7f7f7f]'
                    }`}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Photo + Bio */}
          <div className="flex flex-col gap-8">
            {/* Profile photo */}
            <motion.div {...fadeUp(0.15)} className="flex items-center gap-8">
              <div 
                className="profile-ring flex-shrink-0 transition-all duration-750"
                style={proMode ? { background: 'linear-gradient(135deg, #10b981, #064e3b)' } : {}}
              >
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-[#050505]">
                  <img
                    src="/profile.png"
                    alt={personal.name}
                    className="w-full h-full object-cover object-top filter grayscale contrast-125"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="pt-1">
                <h3 
                  className={`font-display font-bold text-xl mb-1 transition-colors duration-500 ${
                    proMode ? 'text-emerald-400' : 'text-white'
                  }`}
                >
                  {personal.name}
                </h3>
                <p 
                  className={`text-xs font-mono tracking-wider transition-colors duration-500 ${
                    proMode ? 'text-emerald-500/60' : 'text-[#7f7f7f]'
                  }`}
                >
                  {personal.title}
                </p>
                <div className="flex items-center gap-2 mt-2.5">
                  <span 
                    className={`w-2 h-2 rounded-full animate-pulse ${
                      proMode ? 'bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-white'
                    }`} 
                  />
                  <span 
                    className={`text-xs font-mono transition-colors duration-500 ${
                      proMode ? 'text-emerald-500/40' : 'text-[#7f7f7f]'
                    }`}
                  >
                    {personal.location}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Bio */}
            <motion.p
              {...fadeUp(0.25)}
              className={`text-lg leading-relaxed font-body transition-colors duration-500 ${
                proMode ? 'text-emerald-400/80' : 'text-[#888888]'
              }`}
            >
              {personal.bio}
            </motion.p>

            {/* Social links row */}
            <motion.div {...fadeUp(0.35)} className="flex gap-4 flex-wrap">
              <a
                href={personal.links.github}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  window.dispatchEvent(
                    new CustomEvent('hud-log', { detail: 'LOCK: EXT_LINK // GITHUB' })
                  );
                }}
                className={`flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm transition-all glass-hover duration-500 ${
                  proMode 
                    ? 'pro-card-border text-emerald-500/70 hover:text-emerald-400 hover:bg-emerald-950/20' 
                    : 'text-[#888888] hover:text-[#F0F0F0]'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                href={personal.links.linkedin}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  window.dispatchEvent(
                    new CustomEvent('hud-log', { detail: 'LOCK: EXT_LINK // LINKEDIN' })
                  );
                }}
                className={`flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm transition-all glass-hover duration-500 ${
                  proMode 
                    ? 'pro-card-border text-emerald-500/70 hover:text-emerald-400 hover:bg-emerald-950/20' 
                    : 'text-[#888888] hover:text-[#F0F0F0]'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a
                href={personal.links.leetcode}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={() => {
                  window.dispatchEvent(
                    new CustomEvent('hud-log', { detail: 'LOCK: EXT_LINK // LEETCODE' })
                  );
                }}
                className={`flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm transition-all glass-hover duration-500 ${
                  proMode 
                    ? 'pro-card-border text-emerald-500/70 hover:text-emerald-400 hover:bg-emerald-950/20' 
                    : 'text-[#888888] hover:text-[#F0F0F0]'
                }`}
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
                LeetCode
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
