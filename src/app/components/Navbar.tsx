import { useEffect, useRef, useState, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { FileText, Menu, X } from 'lucide-react';
import { useIsMobile } from './ui/use-mobile';

const navLinks = ['About', 'Projects', 'Skills', 'Experience', 'Contact'];

export function Navbar() {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      setIsMenuOpen(false);
    }
  }, [isMobile]);

  return (
    <motion.nav
      initial={isMobile ? false : { y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: isMobile ? 0 : 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] max-w-6xl"
    >
      <div className="glass-card px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-white/10">
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative flex items-center justify-between gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm md:text-base">AS</span>
            </div>
            <span className="text-white/90 tracking-tight text-sm md:text-base hidden sm:inline">Abhishek Singh</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-4 md:gap-8">
            {navLinks.map((link, index) => (
              <MagneticLink key={link} delay={index * 0.1}>
                {link}
              </MagneticLink>
            ))}
            <motion.a
              href="/resume/abhishek-singh-resume.pdf"
              target="_blank"
              rel="noreferrer"
              initial={isMobile ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1, duration: isMobile ? 0 : 0.5 }}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm text-violet-100 transition-all hover:border-violet-300/40 hover:bg-violet-500/15"
            >
              <FileText className="h-4 w-4" />
              Resume
            </motion.a>
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex md:hidden items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white/85 transition-colors hover:bg-white/10"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <motion.div
          initial={false}
          animate={
            isMenuOpen
              ? { height: 'auto', opacity: 1, marginTop: 16 }
              : { height: 0, opacity: 0, marginTop: 0 }
          }
          transition={{ duration: isMobile ? 0.18 : 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden md:hidden"
        >
          <div className="space-y-3 border-t border-white/10 pt-4">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm uppercase tracking-[0.18em] text-white/70 transition-colors hover:bg-white/[0.06] hover:text-white"
              >
                <span>{link}</span>
                <span className="text-white/35">0{navLinks.indexOf(link) + 1}</span>
              </a>
            ))}

            <a
              href="/resume/abhishek-singh-resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsMenuOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-violet-400/25 bg-violet-500/10 px-4 py-3 text-sm text-violet-100 transition-all hover:border-violet-300/40 hover:bg-violet-500/15"
            >
              <FileText className="h-4 w-4" />
              Resume
            </a>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}

function MagneticLink({ children, delay }: { children: string; delay: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (isMobile) return;
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

    if (distance < 40) {
      const strength = Math.max(0, (40 - distance) / 40);
      setPosition({
        x: distanceX * strength * 0.25,
        y: distanceY * strength * 0.25,
      });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.a
      ref={ref}
      href={`#${children.toLowerCase()}`}
      initial={{ opacity: 0, y: -10 }}
      animate={isMobile ? { opacity: 1, x: 0, y: 0 } : { opacity: 1, x: position.x, y: position.y }}
      transition={{
        opacity: { delay, duration: isMobile ? 0 : 0.5 },
        x: { type: 'spring', stiffness: 150, damping: 15 },
        y: { type: 'spring', stiffness: 150, damping: 15 },
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="magnetic-btn text-sm text-white/60 hover:text-white transition-colors"
    >
      {children}
    </motion.a>
  );
}
