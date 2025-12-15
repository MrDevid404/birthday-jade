import { useState } from "react";
import { Play, Music, Volume2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
interface StartScreenProps {
  onStart: () => void;
  onToggleMusic: () => void;
  isMusicPlaying: boolean;
}
const StartScreen = ({
  onStart,
  onToggleMusic,
  isMusicPlaying
}: StartScreenProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return <div className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden" style={{
    backgroundImage: `url(${heroBg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
      <div className="absolute inset-0 bg-gradient-to-b from-cream/20 via-transparent to-gold-light/30" />
      
      {/* Floating decorations - toned down */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => <div key={i} className="absolute animate-float" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 3}s`,
        animationDuration: `${4 + Math.random() * 2}s`
      }}>
            <span className="text-xl opacity-50">
              {['✨', '⭐', '🎈'][Math.floor(Math.random() * 3)]}
            </span>
          </div>)}
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg">
        <div className="animate-float mb-4">
          <span className="text-5xl">🎉</span>
        </div>
        
        <h1 className="font-display text-5xl md:text-6xl text-gradient mb-3 animate-fade-in-up">JAEDSOAALALLLLLLLLLL!!!!!!!!!!!!!!!!!!!!!!!1</h1>
        
        <p className="text-foreground/70 text-lg mb-8 font-body animate-fade-in-up" style={{
        animationDelay: '0.2s'
      }}>enjoyy...</p>

        <div className="flex flex-col items-center gap-4 animate-fade-in-up" style={{
        animationDelay: '0.3s'
      }}>
          <button onClick={onStart} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="btn-celebration group flex items-center gap-3">CLICKMEPLEASE<Play className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} fill="currentColor" />
            Let's Go
          </button>

          <button onClick={onToggleMusic} className="flex items-center gap-2 text-foreground/60 hover:text-primary transition-colors duration-300 mt-2">
            {isMusicPlaying ? <Volume2 className="w-5 h-5" /> : <Music className="w-5 h-5" />}
            <span className="text-sm font-medium">
              {isMusicPlaying ? 'Music On' : 'Play Music'}
            </span>
          </button>
        </div>
      </div>
    </div>;
};
export default StartScreen;