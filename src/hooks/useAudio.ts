import { useState, useRef, useEffect, useCallback } from "react";

// Background music URL (royalty-free birthday music)
const BACKGROUND_MUSIC_URL = "https://www.soundjay.com/misc/sounds/magic-chime-02.mp3";
const CELEBRATION_SOUND_URL = "https://www.soundjay.com/misc/sounds/magic-chime-03.mp3";

export const useAudio = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const celebrationSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio elements
    backgroundMusicRef.current = new Audio(BACKGROUND_MUSIC_URL);
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.3;

    celebrationSoundRef.current = new Audio(CELEBRATION_SOUND_URL);
    celebrationSoundRef.current.volume = 0.5;

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
      if (celebrationSoundRef.current) {
        celebrationSoundRef.current = null;
      }
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!backgroundMusicRef.current) return;

    if (isMusicPlaying) {
      backgroundMusicRef.current.pause();
    } else {
      backgroundMusicRef.current.play().catch(() => {
        console.log("Audio autoplay prevented by browser");
      });
    }
    setIsMusicPlaying(!isMusicPlaying);
  }, [isMusicPlaying]);

  const playCelebrationSound = useCallback(() => {
    if (celebrationSoundRef.current) {
      celebrationSoundRef.current.currentTime = 0;
      celebrationSoundRef.current.play().catch(() => {
        console.log("Audio play prevented by browser");
      });
    }
  }, []);

  return {
    isMusicPlaying,
    toggleMusic,
    playCelebrationSound,
  };
};
