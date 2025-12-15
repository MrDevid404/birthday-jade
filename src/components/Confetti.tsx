import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  color: string;
  delay: number;
  duration: number;
  size: number;
}

interface Balloon {
  id: number;
  x: number;
  color: string;
  delay: number;
  size: number;
}

const COLORS = [
  'hsl(340, 75%, 65%)', // primary rose
  'hsl(40, 90%, 60%)',  // gold
  'hsl(15, 80%, 70%)',  // coral
  'hsl(25, 90%, 85%)',  // peach
  'hsl(340, 60%, 85%)', // rose soft
];

const Confetti = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    // Generate confetti pieces
    const pieces: ConfettiPiece[] = [];
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 2,
        size: 8 + Math.random() * 8,
      });
    }
    setConfetti(pieces);

    // Generate balloons
    const balloonPieces: Balloon[] = [];
    for (let i = 0; i < 15; i++) {
      balloonPieces.push({
        id: i,
        x: Math.random() * 100,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: Math.random() * 3,
        size: 40 + Math.random() * 30,
      });
    }
    setBalloons(balloonPieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={`confetti-${piece.id}`}
          className="absolute animate-confetti"
          style={{
            left: `${piece.x}%`,
            top: '-20px',
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}

      {/* Balloons */}
      {balloons.map((balloon) => (
        <div
          key={`balloon-${balloon.id}`}
          className="absolute animate-balloon"
          style={{
            left: `${balloon.x}%`,
            bottom: '-100px',
            animationDelay: `${balloon.delay}s`,
          }}
        >
          <svg
            width={balloon.size}
            height={balloon.size * 1.3}
            viewBox="0 0 50 65"
          >
            {/* Balloon body */}
            <ellipse
              cx="25"
              cy="22"
              rx="20"
              ry="22"
              fill={balloon.color}
            />
            {/* Highlight */}
            <ellipse
              cx="18"
              cy="15"
              rx="6"
              ry="8"
              fill="white"
              opacity="0.3"
            />
            {/* Knot */}
            <polygon
              points="22,44 28,44 25,50"
              fill={balloon.color}
            />
            {/* String */}
            <path
              d="M25,50 Q30,55 25,60 Q20,65 25,70"
              stroke={balloon.color}
              strokeWidth="1"
              fill="none"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default Confetti;
