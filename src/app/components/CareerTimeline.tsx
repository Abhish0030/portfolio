import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from './ui/use-mobile';

interface TimelineItem {
  year: string;
  role: string;
  type: string;
  description: string;
  color: string;
}

interface CareerTimelineProps {
  items: TimelineItem[];
}

export function CareerTimeline({ items }: CareerTimelineProps) {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      setVisibleItems(items.map((_, index) => index));
      return;
    }

    const observers = items.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.3 }
      );

      if (refs.current[index]) {
        observer.observe(refs.current[index]!);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [items, isMobile]);

  return (
    <div className="relative">
      {/* Vertical gradient line */}
      <div className="absolute left-3 md:left-[200px] top-0 bottom-0 w-[2px]">
        <div
          className="w-full h-full bg-gradient-to-b from-violet-600 via-purple-500 to-fuchsia-600"
          style={{
            boxShadow: '0 0 20px rgba(124, 58, 237, 0.5)',
          }}
        />
      </div>

      {/* Timeline items */}
      <div className="space-y-16 md:space-y-24">
        {items.map((item, index) => (
          <motion.div
            key={item.year}
            ref={(el) => (refs.current[index] = el)}
            initial={isMobile ? false : { opacity: 0, x: -50 }}
            animate={
              visibleItems.includes(index)
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: -50 }
            }
            transition={{
              duration: isMobile ? 0 : 0.8,
              delay: index * 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative flex flex-col gap-4 pl-10 md:flex-row md:items-start md:gap-16 md:pl-0"
          >
            {/* Year */}
            <div className="w-full md:w-[160px] text-left md:text-right">
              <motion.div
                initial={isMobile ? false : { scale: 0.8, opacity: 0 }}
                animate={
                  visibleItems.includes(index)
                    ? { scale: 1, opacity: 1 }
                    : { scale: 0.8, opacity: 0 }
                }
                transition={{ duration: isMobile ? 0 : 0.6, delay: index * 0.2 + 0.2 }}
                className="text-3xl md:text-6xl text-white/90"
              >
                {item.year}
              </motion.div>
            </div>

            {/* Timeline dot */}
            <div className="absolute left-3 top-3 flex -translate-x-1/2 items-center justify-center md:relative md:left-auto md:top-auto md:translate-x-0 md:-ml-3">
              <motion.div
                initial={isMobile ? false : { scale: 0 }}
                animate={
                  visibleItems.includes(index) ? { scale: 1 } : { scale: 0 }
                }
                transition={{
                  duration: isMobile ? 0 : 0.5,
                  delay: index * 0.2 + 0.3,
                  type: 'spring',
                }}
                className="relative z-10"
              >
                {/* Outer glow */}
                <div
                  className="absolute inset-0 rounded-full blur-lg"
                  style={{
                    background: item.color,
                    width: '40px',
                    height: '40px',
                    transform: 'translate(-50%, -50%)',
                    top: '50%',
                    left: '50%',
                  }}
                />
                
                {/* Dot */}
                <div
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full border-4 border-[#050505]"
                  style={{ background: item.color }}
                />
              </motion.div>
            </div>

            {/* Content */}
            <div className="flex-1 pb-4 md:pb-8">
              <motion.div
                initial={isMobile ? false : { opacity: 0, y: 20 }}
                animate={
                  visibleItems.includes(index)
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 20 }
                }
                transition={{ duration: isMobile ? 0 : 0.6, delay: index * 0.2 + 0.4 }}
                className="panel-glow relative overflow-hidden rounded-[24px] md:rounded-[28px] border border-white/8 bg-white/[0.02] px-5 md:px-6 py-5 md:py-6 shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div
                  className="absolute right-0 top-0 h-28 w-28 rounded-full blur-3xl"
                  style={{ background: item.color, opacity: 0.14 }}
                />
                <h3 className="text-xl md:text-3xl lg:text-4xl mb-2 text-white">
                  {item.role}
                </h3>
                <p className="text-base md:text-lg text-violet-400 mb-4">
                  {item.type}
                </p>
                <p className="text-sm md:text-base text-white/60 max-w-xl leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
