import { useEffect, useState } from 'react';

const commands = [
  '$ npm install abhishek-portfolio',
  '⠋ Installing dependencies...',
  '✓ React installed',
  '✓ TypeScript installed',
  '✓ Tailwind CSS installed',
  '✓ Motion installed',
  '$ npm run build',
  '⠋ Building production bundle...',
  '✓ Portfolio built successfully!',
  '$ npm start',
  '> Server running on localhost:3000',
  '✓ Ready to showcase',
];

export function Terminal() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= commands.length) return;

    const currentCommand = commands[currentLine];
    
    if (currentChar < currentCommand.length) {
      const timeout = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          newLines[currentLine] = currentCommand.substring(0, currentChar + 1);
          return newLines;
        });
        setCurrentChar(currentChar + 1);
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentLine(currentLine + 1);
        setCurrentChar(0);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  return (
    <div className="glass-card relative p-6 rounded-2xl border border-white/10 overflow-hidden">
      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="relative space-y-1">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/5">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="text-xs text-white/40 font-mono">terminal — bash</span>
        </div>
        
        <div className="font-mono text-sm space-y-1 min-h-[200px]">
          {displayedLines.map((line, index) => (
            <div
              key={index}
              className={`${
                line.startsWith('$')
                  ? 'text-violet-400'
                  : line.includes('✓')
                  ? 'text-green-400'
                  : line.includes('⠋')
                  ? 'text-yellow-400'
                  : 'text-white/60'
              }`}
            >
              {line}
              {index === displayedLines.length - 1 && currentChar < commands[currentLine]?.length && (
                <span className="inline-block w-2 h-4 bg-violet-400 ml-1 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
