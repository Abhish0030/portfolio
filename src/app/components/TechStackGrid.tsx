import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';

interface Technology {
  name: string;
  icon: string;
  category?: string;
}

interface TechStackGridProps {
  technologies: Technology[][];
}

export function TechStackGrid({ technologies }: TechStackGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  let cardIndex = 0;

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_center,rgba(168,85,247,0.26),transparent_50%),linear-gradient(180deg,rgba(58,20,98,0.65),rgba(13,8,23,0.92))] px-4 py-10 md:px-8 md:py-14"
    >
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-[100px]" />
        <div className="absolute inset-x-10 top-1/2 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        <div className="absolute left-1/2 top-[12%] h-[76%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/15 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 opacity-[0.08] [background-image:radial-gradient(circle_at_center,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:34px_34px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-4 md:gap-5">
        {technologies.map((row, rowIndex) => (
          <div
            key={`row-${rowIndex}`}
            className="flex w-full justify-center gap-3 md:gap-5"
          >
            {row.map((tech) => {
              const index = cardIndex++;

              return (
                <TechCard
                  key={tech.name}
                  tech={tech}
                  index={index}
                  isHovered={hoveredIndex === index}
                  onHover={() => setHoveredIndex(index)}
                  onLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

interface TechCardProps {
  tech: Technology;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function TechCard({ tech, index, isHovered, onHover, onLeave }: TechCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.02,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ scale: 1.05, y: -4 }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className="relative group w-[92px] shrink-0 md:w-[104px]"
    >
      {/* Glow effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-300/30 via-white/20 to-purple-300/30 blur-2xl"
      />

      {/* Card */}
      <div className="relative flex aspect-square items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-white/[0.05] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-violet-200/6 to-transparent opacity-70" />
        
        {/* Noise texture */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative flex h-full flex-col items-center justify-center gap-2 p-2 md:p-3">
          {/* Icon */}
          <div className="text-3xl md:text-4xl grayscale group-hover:grayscale-0 transition-all duration-300">
            {tech.icon}
          </div>
          
          {/* Name */}
          <div className="px-1 text-center text-[10px] md:text-xs font-medium text-white/75 group-hover:text-white transition-colors duration-300">
            {tech.name}
          </div>
        </div>

        {/* Border glow on hover */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.35), rgba(196,181,253,0.35), rgba(216,180,254,0.3))',
            padding: '1px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
      </div>
    </motion.div>
  );
}
