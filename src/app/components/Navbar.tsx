import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { FileText } from 'lucide-react';

const navLinks = ['About', 'Projects', 'Skills', 'Experience', 'Contact'];

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] max-w-6xl"
    >
      <div className="glass-card px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-white/10 backdrop-blur-[25px]">
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none rounded-2xl"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm md:text-base">AS</span>
            </div>
            <span className="text-white/90 tracking-tight text-sm md:text-base hidden sm:inline">Abhishek Singh</span>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-4 md:gap-8">
            {navLinks.map((link, index) => (
              <MagneticLink key={link} delay={index * 0.1}>
                {link}
              </MagneticLink>
            ))}
            <motion.a
              href="/resume/abhishek-singh-resume.pdf"
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.1, duration: 0.5 }}
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-violet-400/25 bg-violet-500/10 px-4 py-2 text-sm text-violet-100 transition-all hover:border-violet-300/40 hover:bg-violet-500/15"
            >
              <FileText className="h-4 w-4" />
              Resume
            </motion.a>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

function MagneticLink({ children, delay }: { children: string; delay: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
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
      animate={{ opacity: 1, x: position.x, y: position.y }}
      transition={{
        opacity: { delay, duration: 0.5 },
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
