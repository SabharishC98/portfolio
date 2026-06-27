import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Footer = ({ proMode }) => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <footer
      ref={ref}
      className={`relative py-10 px-6 md:px-16 transition-colors duration-700 ${
        proMode ? 'bg-[#030705] border-t border-emerald-500/10' : 'bg-[#000000] border-t border-white/[0.05]'
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className={`text-xs font-body transition-colors duration-500 ${
            proMode ? 'text-emerald-500/50' : 'text-[#888888]'
          }`}
        >
          Designed & Built by{' '}
          <span className={proMode ? 'text-emerald-400 font-semibold' : 'gradient-text font-semibold'}> Sabharish C </span>
          {' '}· 2026
        </motion.p>

        {/* Back to top */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`back-top transition-all duration-300 ${
            proMode ? '!border-emerald-500/30 !text-emerald-400 hover:!border-emerald-400 hover:bg-emerald-950/30' : ''
          }`}
          aria-label="Back to top"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 12V4M3 8l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
