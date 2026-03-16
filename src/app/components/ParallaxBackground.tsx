import { useEffect, useState } from 'react';

export function ParallaxBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_32%),linear-gradient(180deg,rgba(8,8,12,0.85),rgba(5,5,5,0.98))]" />

      {/* Layer 1 - Slowest */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      >
        <div className="animate-float-soft absolute top-[12%] left-[8%] h-[540px] w-[540px] rounded-full bg-violet-600/18 blur-[130px]" />
      </div>

      {/* Layer 2 - Medium */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        <div className="animate-float-soft absolute right-[10%] top-[28%] h-[460px] w-[460px] rounded-full bg-sky-500/12 blur-[120px]" style={{ animationDelay: '1.4s' }} />
      </div>

      {/* Layer 3 - Faster */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="animate-float-soft absolute bottom-[8%] left-[38%] h-[360px] w-[360px] rounded-full bg-fuchsia-600/10 blur-[100px]" style={{ animationDelay: '2.4s' }} />
      </div>

      <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full border border-white/6 bg-white/[0.015] blur-3xl" />

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
