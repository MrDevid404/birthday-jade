import { useState } from "react";
import { ExternalLink, Gift } from "lucide-react";
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

  return (
    <div className="fixed inset-0 bg-gradient-hero flex items-center justify-center p-4 overflow-auto">
      {showConfetti && <Confetti />}
      
      <div className="max-w-xl w-full py-8">
        {!isOpen ? (
          <div className="relative cursor-pointer group" onClick={handleOpenCard}>
            <div className="card-birthday transition-all duration-300 group-hover:shadow-glow group-hover:scale-[1.02] text-center py-12">
              <div className="animate-float mb-4">
                <Gift className="w-12 h-12 text-primary mx-auto" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl text-gradient mb-3">Your Birthday Card</h2>
              <p className="text-foreground/60 font-body">Tap to open</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-scale-in">
            <div className="card-birthday text-center">
              <span className="text-4xl mb-4 block">🎂</span>
              
              <h1 className="font-display text-4xl md:text-5xl text-gradient mb-4">Happy 17th!</h1>
              
              <div className="max-w-md mx-auto space-y-3 text-foreground/75 font-body leading-relaxed">
                <p>Yo,</p>
                <p>
                  17 is a big deal. You're growing into someone incredible and I'm glad I get to witness it.
                </p>
                <p>
                  Through everything, you've always kept it real. That's rare and I appreciate you for it.
                </p>
                <p>
                  Here's to another year of wins, growth, and good times. You deserve all of it.
                </p>
                <p className="font-display text-xl text-gradient pt-3">
                  Happy Birthday!
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-muted-foreground text-sm mb-3 font-body">Made this for you:</p>
                <a
                  href="https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-celebration text-sm"
                >
                  <span>Your Playlist</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="card-birthday">
              <h2 className="font-display text-2xl text-gradient text-center mb-4">Blow Out the Candle</h2>
              <BirthdayCake onBlowCandle={() => setCandleBlown(true)} />
            </div>

            {candleBlown && (
              <div className="text-center animate-fade-in-up py-4">
                <p className="font-display text-2xl text-gradient mb-2">Hope it comes true!</p>
                <p className="text-muted-foreground text-sm font-body">- Your Best Friend</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GreetingCard;
