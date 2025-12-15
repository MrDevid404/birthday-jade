import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/Smiling Man Talking on Cell Phone Stock Photo - Image of handsome, cheer_ 36971928.jpg";
import memory4 from "@/assets/Robin and Steve XD.jpg";
import memory3 from "@/assets/Robin and Steve XD.jpg";

interface SlideshowProps {
  onComplete: () => void;
}

const slides = [
  {
    image: memory1,
    title: "my best friend in the wurlddd",
    text: "No cap, you’re the realest. From random laughs to late-night talks, life’s way better with you in it",
  },
  {
    image: memory2,
    title: "thanks for the long convos and elite comms for talking to girls",
    text: "Every moment with you is legendary. As Dumbledore said, 'Happiness can be found even in the darkest of times, if one only remembers to turn on the light.' Here's to many more epic talks!",
  },
  {
    image: memory3,
    title: "TODAY IS ALL ABOUT YOU!!!",
    text: "Today is all about celebrating YOU! Just like in 'A Mystery Called Love,' the little things make life magical. Let's make today unforgettable!",
  },
  {
  image: memory4,
  title: "the Robin to my Steve",
  text: "Couldn’t ask for a better partner in crime. From silly adventures to random chaos, you’ve always got my back!",
  },
  {
    image: null,
    title: "17 Things I Know About You",
    text: "Just some reasons why you're the best...",
    isList: true,
    reasons: [
      "You really know good music",
      "The way you keep it real",
      "Your sense of humor",
      "You never leave a friend hanging",
      "You give the best advice (my personal ai that's not ai)",
      "The vibes you bring",
      "Your loyalty",
      "You are really smart",
      "You stand for what you believe in and care about",
      "You are a really good writer, you wrote the best book i've read",
      "Your favorite color is blue",
      "You're really empathic", 
      "Very humble", 
      "Your optimism",
      "You're actually 16(but your secret is safe)",
      "And you have a very unique, and loyal taste in things",
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
