import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from './ui/use-mobile';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  span?: 4 | 6 | 8 | 12;
}

export function BentoCard({ children, className = '', delay = 0, span = 4 }: BentoCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isMobile]);

  const spanClass = span === 12 ? 'col-span-12' : span === 8 ? 'col-span-12 lg:col-span-8' : 'col-span-12 md:col-span-6 lg:col-span-4';

  if (span === 6) {
    // Special handling for projects - full width on mobile, half on desktop
    return (
      <motion.div
        ref={ref}
        initial={isMobile ? false : { opacity: 0, y: 60 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
        whileHover={isMobile ? undefined : { y: -8, scale: 1.01 }}
        transition={{
          duration: isMobile ? 0 : 0.8,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={`glass-card panel-glow hover-shift relative rounded-[24px] md:rounded-[28px] border border-white/10 p-4 md:p-6 overflow-hidden col-span-12 md:col-span-6 ${className}`}
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="pointer-events-none absolute -right-14 top-8 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />
        
        <div className="relative z-10">{children}</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={isMobile ? false : { opacity: 0, y: 60 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      whileHover={isMobile ? undefined : { y: -8, scale: 1.01 }}
      transition={{
        duration: isMobile ? 0 : 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`glass-card panel-glow hover-shift relative rounded-[24px] md:rounded-[28px] border border-white/10 p-4 md:p-6 overflow-hidden ${spanClass} ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
      <div className="pointer-events-none absolute -right-14 top-8 h-32 w-32 rounded-full bg-violet-500/10 blur-3xl" />
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
