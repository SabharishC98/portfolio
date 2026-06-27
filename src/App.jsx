import { useState, useEffect, lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';

// Components
import Preloader from './components/Preloader';
import CustomCursor from './components/CustomCursor';
import PageTransition from './components/PageTransition';
import FloatingCrosshair from './components/FloatingCrosshair';
import ScrollProgressBar from './components/ScrollProgressBar';
import ClickParticles from './components/ClickParticles';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ProjectsSection from './components/ProjectsSection';
import ExperienceSection from './components/ExperienceSection';
import ResearchSection from './components/ResearchSection';
import AchievementsSection from './components/AchievementsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

import MarqueeTicker from './components/MarqueeTicker';
import BackgroundGrid from './components/BackgroundGrid';
import ViewportFrame from './components/ViewportFrame';

function App() {
  const [loading, setLoading] = useState(true);
  const [lenisReady, setLenisReady] = useState(false);
  const proMode = false;

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (loading) return;

    let lenis;

    const initLenis = async () => {
      try {
        const { default: Lenis } = await import('lenis');
        lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smooth: true,
          smoothTouch: false,
        });

        const raf = (time) => {
          lenis.raf(time);
          requestAnimationFrame(raf);
        };

        requestAnimationFrame(raf);
        setLenisReady(true);
      } catch (err) {
        // Lenis optional — fall back to native scroll
        console.warn('Lenis init failed, using native scroll:', err.message);
        setLenisReady(true);
      }
    };

    initLenis();

    return () => {
      lenis?.destroy();
    };
  }, [loading]);

  const handlePreloaderComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Background layout vertical grid lines */}
      <BackgroundGrid />

      {/* Screen/Vignette Frame */}
      <ViewportFrame proMode={proMode} />

      {/* Custom cursor (desktop only) */}
      <CustomCursor proMode={proMode} />

      {/* Scroll progress bar */}
      <ScrollProgressBar />

      {/* Click particle burst */}
      <ClickParticles />

      {/* Trionn-style floating + crosshair echo (desktop only) */}
      <FloatingCrosshair />

      {/* Trionn-style belt wipe page transition */}
      {!loading && <PageTransition />}

      {/* Preloader */}
      <AnimatePresence>
        {loading && <Preloader onComplete={handlePreloaderComplete} />}
      </AnimatePresence>

      {/* Main site */}
      {!loading && (
        <>
          <Navbar proMode={proMode} />

          <main className="transition-colors duration-700">
            <HeroSection proMode={proMode} />
            <MarqueeTicker proMode={proMode} />
            <AboutSection proMode={proMode} />
            <SkillsSection proMode={proMode} />
            <ProjectsSection proMode={proMode} />
            <ExperienceSection proMode={proMode} />
            <ResearchSection proMode={proMode} />
            <AchievementsSection proMode={proMode} />
            <ContactSection proMode={proMode} />
          </main>

          <Footer proMode={proMode} />
        </>
      )}
    </>
  );
}

export default App;

