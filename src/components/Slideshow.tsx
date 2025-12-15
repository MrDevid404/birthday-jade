import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";

interface SlideshowProps {
  onComplete: () => void;
}

const slides = [
  {
    image: memory1,
    title: "u",
    text: "Through thick and thin, you've always been there. That means everything.",
  },
  {
    image: memory2,
    title: "The Adventures",
    text: "Every moment with you is one for the books. Here's to many more.",
  },
  {
    image: memory3,
    title: "The Celebration",
    text: "Today is all about you. Let's make it special!",
  },
  {
    image: null,
    title: "17 Things About You",
    text: "Just some reasons why you're the best...",
    isList: true,
    reasons: [
      "Your genuine personality",
      "The way you keep it real",
      "Your sense of humor",
      "How you always show up",
      "Your strength and resilience",
      "The vibes you bring",
      "Your loyalty",
      "Just being you",
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
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const nextSlide = () => {
    if (currentSlide === slides.length - 1) {
      onComplete();
    } else {
      goToSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) goToSlide(currentSlide - 1);
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
      <div 
        className={`max-w-3xl w-full transition-all duration-400 ${
          isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="card-birthday relative">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            {slide.image && (
              <div className="w-full md:w-1/2 flex-shrink-0">
                <div className="rounded-xl overflow-hidden shadow-soft">
                  <img src={slide.image} alt={slide.title} className="w-full h-56 md:h-72 object-cover" />
                </div>
              </div>
            )}

            <div className={`w-full ${slide.image ? 'md:w-1/2' : ''} text-center md:text-left`}>
              <h2 className="font-display text-3xl md:text-4xl text-gradient mb-3">{slide.title}</h2>
              
              {slide.isList ? (
                <div className="space-y-2">
                  {slide.reasons?.map((reason, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2 text-foreground/75 animate-fade-in-up"
                      style={{ animationDelay: `${i * 0.08}s` }}
                    >
                      <Star className="w-3 h-3 text-primary flex-shrink-0" fill="currentColor" />
                      <span className="font-body text-sm">{reason}</span>
                    </div>
                  ))}
                  <p className="text-muted-foreground text-xs mt-3">...and 9 more!</p>
                </div>
              ) : (
                <p className="text-foreground/75 font-body leading-relaxed">{slide.text}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between mt-6">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-2 rounded-lg bg-muted hover:bg-primary/10 transition-colors disabled:opacity-30"
            >
              <ChevronLeft className="w-5 h-5 text-foreground" />
            </button>

            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide ? 'w-5 bg-primary' : 'bg-primary/30 hover:bg-primary/50'
                  }`}
                />
              ))}
            </div>

            <button onClick={nextSlide} className="p-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-soft">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <p className="text-center text-muted-foreground text-xs mt-3 font-body">
          Use arrow keys to navigate
        </p>
      </div>
    </div>
  );
};

export default Slideshow;
