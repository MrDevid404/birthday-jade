import { useState } from "react";
import { Sparkles } from "lucide-react";

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
      {/* Cake SVG */}
      <div 
        className="relative cursor-pointer transition-transform hover:scale-105 duration-300"
        onClick={handleBlowCandle}
      >
        <svg width="200" height="220" viewBox="0 0 200 220">
          {/* Cake base - bottom tier */}
          <ellipse cx="100" cy="200" rx="90" ry="15" fill="hsl(340, 70%, 85%)" />
          <rect x="10" y="160" width="180" height="40" fill="hsl(340, 70%, 75%)" rx="5" />
          <ellipse cx="100" cy="160" rx="90" ry="15" fill="hsl(340, 60%, 85%)" />
          
          {/* Frosting drips - bottom */}
          <path d="M20,160 Q25,175 20,170 Q15,165 20,160" fill="hsl(0, 0%, 98%)" />
          <path d="M50,160 Q55,180 50,175 Q45,170 50,160" fill="hsl(0, 0%, 98%)" />
          <path d="M80,160 Q85,170 80,165 Q75,160 80,160" fill="hsl(0, 0%, 98%)" />
          <path d="M120,160 Q125,175 120,170 Q115,165 120,160" fill="hsl(0, 0%, 98%)" />
          <path d="M150,160 Q155,180 150,175 Q145,170 150,160" fill="hsl(0, 0%, 98%)" />
          <path d="M180,160 Q185,170 180,165 Q175,160 180,160" fill="hsl(0, 0%, 98%)" />

          {/* Middle tier */}
          <ellipse cx="100" cy="160" rx="70" ry="12" fill="hsl(340, 70%, 85%)" />
          <rect x="30" y="120" width="140" height="40" fill="hsl(15, 80%, 75%)" rx="5" />
          <ellipse cx="100" cy="120" rx="70" ry="12" fill="hsl(15, 70%, 85%)" />
          
          {/* Frosting drips - middle */}
          <path d="M40,120 Q45,135 40,130 Q35,125 40,120" fill="hsl(0, 0%, 98%)" />
          <path d="M70,120 Q75,140 70,135 Q65,130 70,120" fill="hsl(0, 0%, 98%)" />
          <path d="M130,120 Q135,135 130,130 Q125,125 130,120" fill="hsl(0, 0%, 98%)" />
          <path d="M160,120 Q165,140 160,135 Q155,130 160,120" fill="hsl(0, 0%, 98%)" />

          {/* Top tier */}
          <ellipse cx="100" cy="120" rx="50" ry="10" fill="hsl(15, 80%, 75%)" />
          <rect x="50" y="80" width="100" height="40" fill="hsl(40, 80%, 75%)" rx="5" />
          <ellipse cx="100" cy="80" rx="50" ry="10" fill="hsl(40, 70%, 85%)" />
          
          {/* Decorations - hearts */}
          <text x="70" y="145" fontSize="12">💕</text>
          <text x="115" y="145" fontSize="12">💕</text>
          <text x="60" y="185" fontSize="12">🌸</text>
          <text x="130" y="185" fontSize="12">🌸</text>

          {/* Number 17 on cake */}
          <text 
            x="100" 
            y="105" 
            textAnchor="middle" 
            fontSize="24" 
            fontFamily="Dancing Script" 
            fill="hsl(340, 80%, 50%)"
            fontWeight="bold"
          >
            17
          </text>

          {/* Candle */}
          <rect x="95" y="45" width="10" height="35" fill="hsl(340, 70%, 75%)" rx="2" />
          <rect x="97" y="50" width="2" height="25" fill="hsl(340, 60%, 85%)" />
          
          {/* Flame */}
          {isLit && (
            <g className="animate-flame origin-center" style={{ transformOrigin: '100px 35px' }}>
              <ellipse cx="100" cy="35" rx="8" ry="15" fill="hsl(40, 100%, 55%)" />
              <ellipse cx="100" cy="32" rx="5" ry="10" fill="hsl(45, 100%, 65%)" />
              <ellipse cx="100" cy="30" rx="3" ry="6" fill="hsl(50, 100%, 85%)" />
            </g>
          )}
          
          {/* Smoke when blown out */}
          {!isLit && (
            <g className="animate-fade-in-up" style={{ opacity: 0.5 }}>
              <ellipse cx="100" cy="25" rx="4" ry="8" fill="hsl(0, 0%, 70%)" />
              <ellipse cx="103" cy="15" rx="3" ry="6" fill="hsl(0, 0%, 80%)" />
            </g>
          )}
        </svg>

        {/* Click hint */}
        {isLit && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <p className="text-sm text-muted-foreground animate-pulse-soft flex items-center gap-1">
              <Sparkles className="w-4 h-4" />
              Click to blow out the candle!
            </p>
          </div>
        )}
      </div>

      {/* Wish prompt */}
      {showWish && (
        <div className="mt-8 text-center animate-scale-in">
          <h3 className="font-display text-2xl text-gradient mb-4">
            Make a Wish! ✨
          </h3>
          <div className="max-w-sm mx-auto">
            <input
              type="text"
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder="Type your secret wish..."
              className="w-full px-4 py-3 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 font-body"
            />
            {wishText && (
              <p className="mt-3 text-sm text-muted-foreground animate-fade-in-up">
                Your wish has been sent to the birthday stars! 🌟
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdayCake;
