import { useState } from "react";

interface BirthdayCakeProps {
  onBlowCandle: () => void;
}

const BirthdayCake = ({ onBlowCandle }: BirthdayCakeProps) => {
  const [isLit, setIsLit] = useState(true);
  const [showWish, setShowWish] = useState(false);
  const [wishText, setWishText] = useState("");

  const handleBlowCandle = () => {
    if (!isLit) return;
    setIsLit(false);
    onBlowCandle();
    setTimeout(() => setShowWish(true), 500);
  };

  return (
    <div className="flex flex-col items-center">
      <div 
        className="relative cursor-pointer transition-transform hover:scale-105 duration-300"
        onClick={handleBlowCandle}
      >
        <svg width="180" height="200" viewBox="0 0 200 220">
          {/* Cake base */}
          <ellipse cx="100" cy="200" rx="85" ry="14" fill="hsl(35, 60%, 80%)" />
          <rect x="15" y="165" width="170" height="35" fill="hsl(30, 50%, 70%)" rx="4" />
          <ellipse cx="100" cy="165" rx="85" ry="14" fill="hsl(35, 55%, 82%)" />
          
          {/* Middle tier */}
          <rect x="35" y="125" width="130" height="40" fill="hsl(40, 70%, 65%)" rx="4" />
          <ellipse cx="100" cy="125" rx="65" ry="11" fill="hsl(42, 65%, 75%)" />
          
          {/* Top tier */}
          <rect x="55" y="85" width="90" height="40" fill="hsl(45, 80%, 70%)" rx="4" />
          <ellipse cx="100" cy="85" rx="45" ry="9" fill="hsl(45, 75%, 80%)" />
          
          {/* Number 17 */}
          <text x="100" y="110" textAnchor="middle" fontSize="22" fontFamily="Dancing Script" fill="hsl(30, 50%, 35%)" fontWeight="bold">17</text>

          {/* Candle */}
          <rect x="96" y="50" width="8" height="35" fill="hsl(40, 80%, 65%)" rx="2" />
          
          {/* Flame */}
          {isLit && (
            <g className="animate-flame" style={{ transformOrigin: '100px 40px' }}>
              <ellipse cx="100" cy="40" rx="7" ry="14" fill="hsl(40, 100%, 55%)" />
              <ellipse cx="100" cy="37" rx="4" ry="9" fill="hsl(45, 100%, 65%)" />
              <ellipse cx="100" cy="35" rx="2" ry="5" fill="hsl(50, 100%, 85%)" />
            </g>
          )}
          
          {/* Smoke */}
          {!isLit && (
            <g className="animate-fade-in-up" style={{ opacity: 0.4 }}>
              <ellipse cx="100" cy="30" rx="3" ry="7" fill="hsl(0, 0%, 70%)" />
            </g>
          )}
        </svg>

        {isLit && (
          <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-muted-foreground animate-pulse-soft">
            Click to blow out!
          </p>
        )}
      </div>

      {showWish && (
        <div className="mt-6 text-center animate-scale-in">
          <h3 className="font-display text-xl text-gradient mb-3">Make a Wish!</h3>
          <input
            type="text"
            value={wishText}
            onChange={(e) => setWishText(e.target.value)}
            placeholder="Your secret wish..."
            className="w-full max-w-xs px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body text-sm"
          />
          {wishText && (
            <p className="mt-2 text-xs text-muted-foreground animate-fade-in-up">
              Sent to the birthday stars! ⭐
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default BirthdayCake;
