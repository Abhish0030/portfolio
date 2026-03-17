import { useEffect, useState } from 'react';
import { useIsMobile } from './ui/use-mobile';

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setScrollY(0);
      return;
    }

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_32%),linear-gradient(180deg,rgba(8,8,12,0.85),rgba(5,5,5,0.98))]" />

      {/* Layer 1 - Slowest */}
      <div
        className="absolute inset-0"
        style={{
          transform: isMobile ? 'none' : `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="animate-float-soft absolute top-[12%] left-[8%] h-[320px] w-[320px] md:h-[540px] md:w-[540px] rounded-full bg-violet-600/18 blur-[90px] md:blur-[130px]" />
      </div>

      {/* Layer 2 - Medium */}
      <div
        className="absolute inset-0"
        style={{
          transform: isMobile ? 'none' : `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="animate-float-soft absolute right-[10%] top-[28%] h-[260px] w-[260px] md:h-[460px] md:w-[460px] rounded-full bg-sky-500/12 blur-[80px] md:blur-[120px]" style={{ animationDelay: '1.4s' }} />
      </div>

      {/* Layer 3 - Faster */}
      <div
        className="absolute inset-0"
        style={{
          transform: isMobile ? 'none' : `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="animate-float-soft absolute bottom-[8%] left-[38%] h-[220px] w-[220px] md:h-[360px] md:w-[360px] rounded-full bg-fuchsia-600/10 blur-[70px] md:blur-[100px]" style={{ animationDelay: '2.4s' }} />
      </div>

      <div className="absolute left-1/2 top-24 h-48 w-48 md:h-72 md:w-72 -translate-x-1/2 rounded-full border border-white/6 bg-white/[0.015] blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(124, 58, 237, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124, 58, 237, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
}
