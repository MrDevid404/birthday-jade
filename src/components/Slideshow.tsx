import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";

interface SlideshowProps {
  onComplete: () => void;
}

const slides = [
  {
    image: memory1,
    title: "Remember When...",
    text: "We became best friends and life got so much more colorful! 💕",
    emoji: "👯‍♀️",
  },
  {
    image: memory2,
    title: "Our Adventures",
    text: "Every moment with you is an adventure worth remembering! 🌅",
    emoji: "✨",
  },
  {
    image: memory3,
    title: "Here's to Us!",
    text: "To endless laughter, crazy memories, and a friendship that means the world to me! 🎈",
    emoji: "💖",
  },
  {
    image: null,
    title: "17 Reasons Why You're Amazing",
    text: "Because one isn't enough...",
    emoji: "🌟",
    isList: true,
    reasons: [
      "Your infectious laugh",
      "Your kindness to everyone",
      "Your amazing sense of humor",
      "The way you light up a room",
      "Your incredible strength",
      "Your beautiful soul",
      "Your loyalty as a friend",
      "Your creative mind",
    ],
  },
];

const Slideshow = ({ onComplete }: SlideshowProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      goToSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentSlide]);

  const slide = slides[currentSlide];

  return (
    <div className="fixed inset-0 bg-gradient-hero flex items-center justify-center p-4 md:p-8">
      {/* Slide Content */}
      <div 
        className={`max-w-4xl w-full transition-all duration-500 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="card-birthday relative overflow-hidden">
          {/* Emoji decoration */}
          <div className="absolute -top-4 -right-4 text-5xl animate-float">
            {slide.emoji}
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
            {/* Image */}
            {slide.image && (
              <div className="w-full md:w-1/2 flex-shrink-0">
                <div className="relative rounded-2xl overflow-hidden shadow-soft">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
              </div>
            )}

            {/* Text Content */}
            <div className={`w-full ${slide.image ? 'md:w-1/2' : ''} text-center md:text-left`}>
              <h2 className="font-display text-3xl md:text-4xl text-gradient mb-4">
                {slide.title}
              </h2>
              
              {slide.isList ? (
                <div className="space-y-2">
                  {slide.reasons?.slice(0, 8).map((reason, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 text-foreground/80 animate-fade-in-up"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <Heart className="w-4 h-4 text-primary flex-shrink-0" fill="currentColor" />
                      <span className="font-body">{reason}</span>
                    </div>
                  ))}
                  <p className="text-muted-foreground text-sm mt-4 italic">
                    ...and 9 more reasons to come! 💫
                  </p>
                </div>
              ) : (
                <p className="text-foreground/80 text-lg font-body leading-relaxed">
                  {slide.text}
                </p>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-full bg-muted hover:bg-primary/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentSlide 
                      ? 'w-6 bg-primary' 
                      : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-soft"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Skip hint */}
        <p className="text-center text-muted-foreground text-sm mt-4 font-body">
          Use arrow keys or click to navigate
        </p>
      </div>
    </div>
  );
};

export default Slideshow;
