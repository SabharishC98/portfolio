import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Research', href: '#research' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href) => {
    setMenuOpen(false);

    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-[9000] px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
          scrolled
            ? 'backdrop-blur-md bg-[#000000]/80 border-b border-white/[0.06]'
            : ''
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display font-bold text-xl tracking-tight select-none transition-all duration-300 gradient-text"
        >
          {portfolioData.personal.initials}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {NAV_LINKS.map((link, i) => (
              <button
                key={link.label}
                onClick={() => handleNav(link.href)}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`nav-link relative px-3 py-1.5 text-sm transition-all duration-300 font-display ${
                  hoveredIndex === null
                    ? 'text-[#888888] hover:text-[#F0F0F0]'
                    : hoveredIndex === i
                    ? 'text-[#F0F0F0]'
                    : 'text-[#888888]/40'
                }`}
              >
                {hoveredIndex === i && (
                  <motion.span
                    layoutId="nav-hover-bg"
                    className="absolute inset-0 bg-white/5 rounded-md -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-[6px] z-[9999]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className="hamburger-line"
            style={{
              transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }}
          />
          <span
            className="hamburger-line"
            style={{ opacity: menuOpen ? 0 : 1, transform: menuOpen ? 'scaleX(0)' : 'none' }}
          />
          <span
            className="hamburger-line"
            style={{
              transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
            }}
          />
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="absolute top-6 left-6 font-display font-bold text-xl gradient-text">
          {portfolioData.personal.initials}
        </div>

        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <motion.button
              key={link.label}
              onClick={() => handleNav(link.href)}
              className="font-display text-4xl font-bold transition-all text-[#F0F0F0] hover:gradient-text"
              initial={{ opacity: 0, y: 20 }}
              animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {link.label}
            </motion.button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
