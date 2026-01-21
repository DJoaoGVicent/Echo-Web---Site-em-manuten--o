import { useEffect, useState } from 'react';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  color: string;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/DJoaoGVicent',
    icon: '⟦ ⟧',
    color: '#39FF14'
  },
  {
    name: 'Discord',
    url: 'https://discord.gg/jgvicent_',
    icon: '⊚',
    color: '#5865F2'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/joaoguivicentino',
    icon: '◉',
    color: '#0A66C2'
  }
];

const CONTENT_LINES = [
  'SITE STATUS: TRABALHO EM PROGRESSO',
  '',
  'Yo!',
  '',
  'Bem vindo ao meu pequeno echo do sistema...',
  '',
  'Estou trabalhando em algumas coisas por aqui...',
  'Provavelmente correndo atrás de um emprego',
  'ou me distraindo jogando mine ou fallout.',
  'Mas o melhor palpite é com certeza gastando o meu tempo',
  '',
  'Volte em breve - prometo que vai ter algo melhor!',
  '',
  '// ME_ENCONTRE_AQUI',
  '',
  'Me chame se quiser conversar sobre qualquer coisa'
];

export function MaintenancePage() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showHeader, setShowHeader] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Animate header first
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHeader(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Animate content lines slowly, 80s style
  useEffect(() => {
    if (!showHeader || currentLineIndex >= CONTENT_LINES.length) {
      if (currentLineIndex >= CONTENT_LINES.length) {
        // Show contact links after content animation
        setTimeout(() => {
          setShowLinks(true);
        }, 800);
      }
      return;
    }

    const message = CONTENT_LINES[currentLineIndex];
    let delay: number;

    if (message === '') {
      delay = 300;
    } else if (message.includes('SITE STATUS')) {
      delay = 600;
    } else if (message.includes('Oi!')) {
      delay = 500;
    } else if (message.includes('ME_ENCONTRE_AQUI')) {
      delay = 700;
    } else {
      delay = 400 + Math.random() * 400; // Random delay 400-800ms
    }

    const timer = setTimeout(() => {
      setDisplayedLines(prev => [...prev, message]);
      setCurrentLineIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentLineIndex, showHeader]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('pt-BR', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const getLineStyle = (line: string, index: number) => {
    if (line.includes('SITE STATUS')) {
      return 'text-[#FF0000] text-lg font-bold mb-6';
    }
    if (line.includes('Oi!')) {
      return 'text-center mb-4 text-xl';
    }
    if (line.includes('Você entrou')) {
      return 'text-center text-cyan-400 mb-6 max-w-2xl mx-auto';
    }
    if (line.includes('ME_ENCONTRE_AQUI')) {
      return 'text-center mb-4';
    }
    if (line.includes('Me chame')) {
      return 'text-center text-sm mb-4 text-primary/80';
    }
    if (line === '') {
      return 'mb-2';
    }
    if (index > 4 && index < 10) {
      return 'text-center leading-relaxed max-w-2xl mx-auto';
    }
    return 'text-center leading-relaxed max-w-2xl mx-auto';
  };

  return (
    <div className="h-screen bg-black text-primary overflow-hidden relative">
      <div className="crt h-full m-4">
        <div className="terminal-content flicker h-full flex flex-col p-6 relative">
          {/* Header with Window Controls and Title */}
          {showHeader && (
            <div className={`mb-6 pb-4 border-b border-border/30 animate-fade-in`}>
              <div className="flex justify-between items-center flex-wrap gap-4 mb-2">
                <div className="flex items-center gap-3">
                  {/* Window Control Buttons */}
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28CA42]"></div>
                  </div>
                  {/* Title Button */}
                  <div className="px-4 py-1 bg-[#1877F2] text-white startup-text text-sm font-bold">
                    Echo In Web
                  </div>
                </div>
                {/* Clock */}
                <div className="startup-text text-sm">
                  <div>{formatTime(currentTime)}</div>
                  <div className="text-primary/80">{formatDate(currentTime)}</div>
                </div>
              </div>
            </div>
          )}

          {/* Main Content - Animated Lines */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="startup-text">
              {displayedLines.map((line, index) => (
                <div key={index} className={getLineStyle(line, index)}>
                  {line}
                </div>
              ))}
            </div>

            {/* Contact Links - Show after content animation */}
            {showLinks && (
              <div className="mt-8 space-y-4 animate-fade-in">
                <div className="flex flex-wrap justify-center gap-3">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="startup-text inline-flex items-center gap-2 px-4 py-2 border border-border/30 hover:border-primary hover:bg-primary/10 transition-all duration-200 hover:shadow-[0_0_10px_rgba(255,255,153,0.3)] relative"
                      style={{
                        color: link.color
                      }}
                    >
                      <span className="text-sm">{link.icon}</span>
                      <span>{link.name}</span>
                      <span className="text-xs ml-1">⇗</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Help Button */}
          {showHeader && (
            <div className="absolute bottom-4 right-4 animate-fade-in">
              <button className="w-8 h-8 bg-black border border-border/30 text-white startup-text text-sm hover:bg-primary/10 transition-all flex items-center justify-center">
                ?
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
