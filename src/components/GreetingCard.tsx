import { useState } from "react";
import { ExternalLink, Gift, Heart } from "lucide-react";
import cardBg from "@/assets/card-bg.jpg";
import BirthdayCake from "./BirthdayCake";
import Confetti from "./Confetti";

interface GreetingCardProps {
  onCelebrate: () => void;
}

const GreetingCard = ({ onCelebrate }: GreetingCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [candleBlown, setCandleBlown] = useState(false);

  const handleOpenCard = () => {
    if (!isOpen) {
      setIsOpen(true);
      setShowConfetti(true);
      onCelebrate();
    }
  };

  const handleBlowCandle = () => {
    setCandleBlown(true);
  };

  return (
    <div className="fixed inset-0 bg-gradient-hero flex items-center justify-center p-4 overflow-auto">
      {showConfetti && <Confetti />}
      
      <div className="max-w-2xl w-full py-8">
        {!isOpen ? (
          // Closed card
          <div 
            className="relative cursor-pointer group"
            onClick={handleOpenCard}
          >
            <div 
              className="rounded-3xl overflow-hidden shadow-card transition-all duration-500 group-hover:shadow-glow group-hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${cardBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="min-h-[400px] flex flex-col items-center justify-center p-8 bg-gradient-to-b from-transparent via-card/30 to-card/60">
                <div className="animate-bounce-slow mb-6">
                  <Gift className="w-16 h-16 text-primary" />
                </div>
                <h2 className="font-display text-4xl md:text-5xl text-gradient mb-4 text-center">
                  A Special Message
                </h2>
                <p className="text-foreground/70 text-lg font-body mb-6">
                  Click to open your birthday card! 💝
                </p>
                <div className="flex items-center gap-2 text-primary animate-pulse-soft">
                  <Heart className="w-5 h-5" fill="currentColor" />
                  <span className="font-medium">Tap to reveal</span>
                  <Heart className="w-5 h-5" fill="currentColor" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Open card
          <div className="space-y-8 animate-scale-in">
            {/* Card content */}
            <div className="card-birthday text-center">
              <div className="mb-6">
                <span className="text-6xl">🎂</span>
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl text-gradient mb-6">
                Happy 17th Birthday!
              </h1>
              
              <div className="max-w-lg mx-auto space-y-4 text-foreground/80 font-body text-lg leading-relaxed">
                <p>
                  To my amazing best friend,
                </p>
                <p>
                  Seventeen is such a special age – you're becoming the incredible person you were always meant to be. Watching you grow has been one of the greatest joys of my life.
                </p>
                <p>
                  You bring so much light and laughter into this world. Your kindness, your strength, and your beautiful heart inspire everyone around you.
                </p>
                <p>
                  Here's to another year of adventures, late-night talks, inside jokes, and memories we'll treasure forever.
                </p>
                <p className="font-display text-2xl text-gradient pt-4">
                  I love you to the moon and back! 🌙
                </p>
              </div>

              {/* Special link */}
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-muted-foreground mb-4 font-body">
                  I made something special just for you:
                </p>
                <a
                  href="https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-celebration text-base"
                >
                  <span>Your Birthday Playlist</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Birthday Cake Section */}
            <div className="card-birthday">
              <h2 className="font-display text-3xl text-gradient text-center mb-6">
                Time to Make a Wish!
              </h2>
              <BirthdayCake onBlowCandle={handleBlowCandle} />
            </div>

            {/* Final message */}
            {candleBlown && (
              <div className="text-center animate-fade-in-up py-8">
                <p className="font-display text-3xl text-gradient mb-4">
                  May all your dreams come true! ✨
                </p>
                <p className="text-muted-foreground font-body">
                  With all my love, forever and always 💕
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GreetingCard;
