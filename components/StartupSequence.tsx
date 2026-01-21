import { useEffect, useState } from 'react';

interface StartupSequenceProps {
  onComplete: () => void;
}

const STARTUP_MESSAGES = [
  'Echo In Web - Terminal Pessoal v1.0',
  '',
  'Coletando seus cookies...',
  'Cookies de sessão coletados com sucesso',
  'Enviando cookies do Facebook...',
  'Exportando chats do Messenger...',
  'Brincadeira!',
  'Eu não coleto nada',
  '',
  'Carregando coffee.exe...',
  'Verificando níveis de motivação... BAIXO',
  'Inicializando protocolos de procrastinação...',
  'Todos os sistemas prontos para procrastinação produtiva!',
  '',
  'Pressione qualquer tecla para continuar...'
];

export function StartupSequence({ onComplete }: StartupSequenceProps) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (currentLineIndex >= STARTUP_MESSAGES.length) {
      // Wait for user interaction, don't auto-advance
      return;
    }

    // Different delays for different types of messages
    let delay: number;
    const message = STARTUP_MESSAGES[currentLineIndex];
    
    if (message === '') {
      // Empty lines show instantly
      delay = 100;
    } else if (message.includes('Brincadeira!') || message.includes('Eu não coleto')) {
      // Joke messages have a pause before
      delay = 800;
    } else if (message.includes('Pressione qualquer tecla')) {
      // Final message has longer delay
      delay = 600;
    } else if (message.includes('Echo In Web')) {
      // Title shows quickly
      delay = 300;
    } else {
      // Regular messages
      delay = 400 + Math.random() * 300; // Random delay between 400-700ms for authenticity
    }

    const timer = setTimeout(() => {
      setDisplayedLines(prev => [...prev, message]);
      setCurrentLineIndex(prev => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentLineIndex, onComplete]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  // Handle click/key press to skip or continue
  useEffect(() => {
    const handleInteraction = () => {
      if (currentLineIndex < STARTUP_MESSAGES.length) {
        // Show all remaining lines if animation is still playing
        const remaining = STARTUP_MESSAGES.slice(currentLineIndex);
        setDisplayedLines(prev => [...prev, ...remaining]);
        setCurrentLineIndex(STARTUP_MESSAGES.length);
      } else {
        // Animation finished, proceed to maintenance page
        onComplete();
      }
    };

    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      handleInteraction();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      handleInteraction();
    };

    window.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentLineIndex, onComplete]);

  return (
    <div className="startup-text">
      {displayedLines.map((line, index) => (
        <div key={index} className={line === '' ? 'mb-2' : ''}>
          {line}
        </div>
      ))}
      {showCursor && currentLineIndex >= STARTUP_MESSAGES.length && (
        <span className="cursor">█</span>
      )}
    </div>
  );
}
