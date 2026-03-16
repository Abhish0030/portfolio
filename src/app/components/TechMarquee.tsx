interface TechMarqueeProps {
  technologies: string[];
}

export function TechMarquee({ technologies }: TechMarqueeProps) {
  const duplicatedTechs = [...technologies, ...technologies, ...technologies];

  return (
    <div className="relative overflow-hidden py-4">
      <div className="flex gap-6 animate-marquee whitespace-nowrap">
        {duplicatedTechs.map((tech, index) => (
          <div
            key={index}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-white/60"
          >
            <div className="w-2 h-2 rounded-full bg-violet-500/60" />
            {tech}
          </div>
        ))}
      </div>
    </div>
  );
}
