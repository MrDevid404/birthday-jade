import { useState, useRef, useEffect, useCallback } from "react";

// Birthday background music (royalty-free)
const BACKGROUND_MUSIC_URL = "https://cdn.pixabay.com/download/audio/2022/02/22/audio_d1718ab41b.mp3";
const CELEBRATION_SOUND_URL = "https://cdn.pixabay.com/download/audio/2021/08/04/audio_0625c1539c.mp3";

export const useAudio = () => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const backgroundMusicRef = useRef<HTMLAudioElement | null>(null);
  const celebrationSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    backgroundMusicRef.current = new Audio(BACKGROUND_MUSIC_URL);
    backgroundMusicRef.current.loop = true;
    backgroundMusicRef.current.volume = 0.4;
    backgroundMusicRef.current.addEventListener('canplaythrough', () => setIsLoaded(true));

    celebrationSoundRef.current = new Audio(CELEBRATION_SOUND_URL);
    celebrationSoundRef.current.volume = 0.6;

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current = null;
      }
    };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!backgroundMusicRef.current) return;

    if (isMusicPlaying) {
      backgroundMusicRef.current.pause();
    } else {
      backgroundMusicRef.current.play().catch(console.log);
    }
    setIsMusicPlaying(!isMusicPlaying);
  }, [isMusicPlaying]);

  const playCelebrationSound = useCallback(() => {
    if (celebrationSoundRef.current) {
      celebrationSoundRef.current.currentTime = 0;
      celebrationSoundRef.current.play().catch(console.log);
    }
  }, []);

  return { isMusicPlaying, toggleMusic, playCelebrationSound, isLoaded };
};
