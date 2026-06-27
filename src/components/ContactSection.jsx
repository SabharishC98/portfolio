import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const SocialIcon = ({ href, label, proMode, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noreferrer"
    aria-label={label}
    className={`w-12 h-12 glass rounded-full flex items-center justify-center text-[#888888] transition-all duration-300 ${
      proMode ? 'pro-card-border bg-[#030d07]/30 text-emerald-400' : ''
    }`}
    onMouseEnter={(e) => {
      if (proMode) {
        e.currentTarget.style.borderColor = '#10b981';
        e.currentTarget.style.color = '#10b981';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(16,185,129,0.3)';
        window.dispatchEvent(
          new CustomEvent('hud-log', { detail: `LOCK: SOCIAL // ${label.toUpperCase()}` })
        );
      } else {
        e.currentTarget.style.borderColor = '#7B2FBE';
        e.currentTarget.style.color = '#7B2FBE';
        e.currentTarget.style.boxShadow = '0 0 20px rgba(123,47,190,0.3)';
      }
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = '';
      e.currentTarget.style.color = proMode ? '#34d399' : '#888888';
      e.currentTarget.style.boxShadow = '';
    }}
  >
    {children}
  </a>
);

const ContactSection = ({ proMode }) => {
  const { personal } = portfolioData;
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    fetch(`https://formsubmit.co/ajax/${personal.email}`, {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        message: formData.message
      })
    })
    .then(response => {
      if (response.ok) {
        console.log('Email sent successfully via FormSubmit');
        setSending(false);
        setSent(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSent(false), 3000);
      } else {
        throw new Error('Failed to send email via FormSubmit');
      }
    })
    .catch((err) => {
      console.error('FAILED...', err);
      alert('Failed to send email. Please try again later.');
      setSending(false);
    });
  };

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 40 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section 
      id="contact" 
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

      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none transition-all duration-700"
        style={{ 
          background: proMode
            ? 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)', 
          filter: 'blur(60px)' 
        }}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div {...fadeUp(0)} className="mb-6">
          <span 
            className={`section-tag transition-colors duration-500 ${
              proMode ? 'text-emerald-500/80 font-mono' : ''
            }`}
          >
            07 — Contact
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp(0.1)}
          className={`section-title font-condensed uppercase tracking-tight mb-6 leading-[1.0] transition-colors duration-500 ${
            proMode ? 'text-emerald-400 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]' : 'text-white'
          }`}
        >
          Let's Build <span className={proMode ? 'text-emerald-500/70' : 'gradient-text'}>Something.</span>
        </motion.h2>

        <motion.p 
          {...fadeUp(0.15)} 
          className={`text-lg mb-12 max-w-lg font-body transition-colors duration-500 ${
            proMode ? 'text-emerald-500/80' : 'text-[#888888]'
          }`}
        >
          Open for internships, freelance projects, and interesting collaborations.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <motion.div {...fadeUp(0.2)} className="relative inline-block mb-10">
              <button
                onClick={copyEmail}
                className={`group flex items-center gap-4 font-display font-semibold text-xl md:text-2xl transition-all duration-300 ${
                  proMode ? 'text-emerald-400 hover:text-emerald-300' : 'text-[#F0F0F0] hover:gradient-text'
                }`}
              >
                <span>{personal.email}</span>
                <span 
                  className={`w-10 h-10 glass rounded-full flex items-center justify-center transition-all ${
                    proMode 
                      ? 'text-emerald-400 group-hover:text-emerald-300 border border-emerald-500/30' 
                      : 'text-[#888888] group-hover:text-white group-hover:border-white'
                  }`}
                >
                  {copied ? (
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <path d="M3 8l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : (
                    <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                      <rect x="5" y="1" width="9" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M2 5H1.5A1.5 1.5 0 0 0 0 6.5v8A1.5 1.5 0 0 0 1.5 16h8A1.5 1.5 0 0 0 11 14.5V14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  )}
                </span>
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className={`absolute -top-9 left-0 text-xs font-mono px-3 py-1 rounded border transition-colors duration-500 ${
                      proMode ? 'text-emerald-400 bg-[#050a07] border-emerald-500/30' : 'text-white bg-[#050505] border-white/20'
                    }`}
                  >
                    Copied! ✓
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div {...fadeUp(0.25)} className="flex gap-3 mb-10">
              <SocialIcon href={personal.links.github} label="GitHub" proMode={proMode}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href={personal.links.linkedin} label="LinkedIn" proMode={proMode}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </SocialIcon>
              <SocialIcon href={personal.links.leetcode} label="LeetCode" proMode={proMode}>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z"/>
                </svg>
              </SocialIcon>
            </motion.div>

            <motion.div {...fadeUp(0.3)} className="flex items-center gap-3">
              <div 
                className={`w-8 h-8 glass rounded-full flex items-center justify-center transition-all duration-500 ${
                  proMode ? 'pro-card-border bg-[#030d07]/30 text-emerald-400' : ''
                }`}
              >
                <svg 
                  className={`w-4 h-4 transition-colors duration-500 ${
                    proMode ? 'text-emerald-400' : 'text-white'
                  }`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"/>
                </svg>
              </div>
              <a 
                href={`tel:${personal.phone}`} 
                className={`transition-colors font-body text-sm ${
                  proMode ? 'text-emerald-500/60 hover:text-emerald-400' : 'text-[#888888] hover:text-[#F0F0F0]'
                }`}
              >
                +91 {personal.phone}
              </a>
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.2)}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label 
                  className={`block text-xs font-mono mb-2 tracking-wider uppercase transition-colors duration-500 ${
                    proMode ? 'text-emerald-400/80' : 'text-[#888888]'
                  }`}
                >
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className={`form-input w-full px-5 py-4 rounded-xl font-body text-sm transition-all duration-300 ${
                    proMode 
                      ? '!bg-emerald-950/5 !border-emerald-500/20 !text-emerald-400 focus:!border-emerald-400 focus:!ring-1 focus:!ring-emerald-400' 
                      : ''
                  }`}
                />
              </div>

              <div>
                <label 
                  className={`block text-xs font-mono mb-2 tracking-wider uppercase transition-colors duration-500 ${
                    proMode ? 'text-emerald-400/80' : 'text-[#888888]'
                  }`}
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className={`form-input w-full px-5 py-4 rounded-xl font-body text-sm transition-all duration-300 ${
                    proMode 
                      ? '!bg-emerald-950/5 !border-emerald-500/20 !text-emerald-400 focus:!border-emerald-400 focus:!ring-1 focus:!ring-emerald-400' 
                      : ''
                  }`}
                />
              </div>

              <div>
                <label 
                  className={`block text-xs font-mono mb-2 tracking-wider uppercase transition-colors duration-500 ${
                    proMode ? 'text-emerald-400/80' : 'text-[#888888]'
                  }`}
                >
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your project..."
                  className={`form-input w-full px-5 py-4 rounded-xl font-body text-sm resize-none transition-all duration-300 ${
                    proMode 
                      ? '!bg-emerald-950/5 !border-emerald-500/20 !text-emerald-400 focus:!border-emerald-400 focus:!ring-1 focus:!ring-emerald-400' 
                      : ''
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={sending || sent}
                className={`w-full py-4 rounded-xl font-display font-semibold text-sm transition-all duration-300 relative overflow-hidden ${
                  proMode ? 'border border-emerald-500/30' : ''
                }`}
                style={
                  proMode
                    ? {
                        background: sent ? '#064e3b' : '#10b981',
                        color: '#ffffff',
                        boxShadow: '0 4px 20px rgba(16, 185, 129, 0.2)',
                        opacity: sending ? 0.7 : 1,
                      }
                    : {
                        background: sent ? '#555555' : '#ffffff',
                        color: sent ? '#ffffff' : '#000000',
                        boxShadow: '0 4px 20px rgba(255, 255, 255, 0.1)',
                        opacity: sending ? 0.7 : 1,
                      }
                }
              >
                {sending ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </span>
                ) : sent ? (
                  'Message Sent ✓'
                ) : (
                  'Send Message →'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
