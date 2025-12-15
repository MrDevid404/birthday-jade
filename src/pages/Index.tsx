import { useState } from "react";
import StartScreen from "@/components/StartScreen";
import Slideshow from "@/components/Slideshow";
import GreetingCard from "@/components/GreetingCard";
import { useAudio } from "@/hooks/useAudio";

type Stage = "start" | "slideshow" | "card";

const Index = () => {
  const [stage, setStage] = useState<Stage>("start");
  const { isMusicPlaying, toggleMusic, playCelebrationSound } = useAudio();

  const handleStart = () => {
    setStage("slideshow");
  };

  const handleSlideshowComplete = () => {
    setStage("card");
  };

  const handleCelebrate = () => {
    playCelebrationSound();
  };

  return (
    <main className="min-h-screen bg-background">
      {stage === "start" && (
        <StartScreen
          onStart={handleStart}
          onToggleMusic={toggleMusic}
          isMusicPlaying={isMusicPlaying}
        />
      )}
      
      {stage === "slideshow" && (
        <Slideshow onComplete={handleSlideshowComplete} />
      )}
      
      {stage === "card" && (
        <GreetingCard onCelebrate={handleCelebrate} />
      )}
    </main>
  );
};

export default Index;
