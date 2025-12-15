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
    <div className="fixed inset-0 bg-gradient-hero overflow-auto p-4 md:p-8">
      {showConfetti && <Confetti />}

      <div className="flex justify-center items-start md:items-center min-h-screen">
        <div className="max-w-xl w-full space-y-6">
          {/* CLOSED CARD */}
          {!isOpen ? (
            <div
              className="relative cursor-pointer group"
              onClick={handleOpenCard}
            >
              <div className="card-birthday transition-all duration-300 group-hover:shadow-glow group-hover:scale-[1.02] text-center py-12">
                <div className="animate-float mb-4">
                  <Gift className="w-12 h-12 text-primary mx-auto" />
                </div>
                <h2 className="font-display text-3xl md:text-4xl text-gradient mb-3">
                  Your Birthday Card
                </h2>
                <p className="text-foreground/60 font-body">Tap to open</p>
              </div>
            </div>
          ) : (
            <div className="space-y-6 animate-scale-in">
              {/* CARD CONTENT */}
              <div className="card-birthday text-center p-6 md:p-8 overflow-visible">
                <span className="text-4xl mb-4 block">🎂</span>
                <h1 className="font-display text-4xl md:text-5xl text-gradient mb-4">
                  Happy 17th!
                </h1>

                <div className="max-w-md mx-auto space-y-3 text-foreground/75 font-body leading-relaxed">
                  <p>Yo,</p>
                  <p>
                    17 already. You’re growing into someone truly awesome, and
                    I’m glad I get to see it happen.
                  </p>
                  <p>
                    No matter what’s going on, you always keep it real. I
                    really appreciate that about you.
                  </p>
                  <p>
                    Here’s to another year of good times, laughs, and
                    everything you deserve.
                  </p>
                  <p>
                    I'm prolly so gased rn cos ive been working on this all
                    day, goodnight and
                  </p>
                  <p>ENJOYYODAYTODAMAXXXXX</p>
                  <p className="font-display text-xl text-gradient pt-3">
                    Happy Birthday!
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border">
                  <p className="text-muted-foreground text-sm mb-3 font-body">
                    Made this for you:
                  </p>
                  <a
                    href="https://open.spotify.com/playlist/5im3NmcAOmci8DLfMkitV3?si=08e3b5e52bc24c11"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 btn-celebration text-sm"
                  >
                    <span>Your Playlist</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* BIRTHDAY CAKE */}
              <div className="card-birthday p-6 md:p-8 overflow-visible">
                <h2 className="font-display text-2xl text-gradient text-center mb-4">
                  Blow Out the Candle
                </h2>
                <BirthdayCake onBlowCandle={() => setCandleBlown(true)} />
              </div>

              {/* CANDLE BLOWN MESSAGE */}
              {candleBlown && (
                <div className="text-center animate-fade-in-up py-4">
                  <p className="font-display text-2xl text-gradient mb-2">
                    Hope it comes true!
                  </p>
                  <p className="text-muted-foreground text-sm font-body">
                    - Your Fairy Godmother
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GreetingCard;
