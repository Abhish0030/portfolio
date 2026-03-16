import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('.glass-card') || target.closest('.magnetic-btn')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="fixed pointer-events-none z-50 transition-all duration-300"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`transition-all duration-300 ${
            isHovering ? 'w-24 h-24' : 'w-12 h-12'
          }`}
          style={{
            background: isHovering
              ? 'radial-gradient(circle, rgba(124, 58, 237, 0.4) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(124, 58, 237, 0.3) 0%, transparent 70%)',
            filter: 'blur(10px)',
            mixBlendMode: isHovering ? 'difference' : 'screen',
          }}
        />
      </div>
      
      {/* Cursor dot */}
      <div
        className="fixed pointer-events-none z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-1 h-1 bg-violet-400 rounded-full" />
      </div>
    </>
  );
}
