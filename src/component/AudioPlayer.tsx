import { useEffect } from "react";
import aviatorSound from "../assets/aviator-sound.mp3";

const audio = new Audio(aviatorSound);
audio.loop = true;

const AudioPlayer: React.FC<{ isPlaying: boolean }> = ({ isPlaying }) => {
  useEffect(() => {
    const playAudio = () => {
      audio.play().catch((err) => console.log("Autoplay blocked:", err));
      document.removeEventListener("click", playAudio);
    };

    if (isPlaying) {
      playAudio(); // Try playing immediately
      document.addEventListener("click", playAudio); // Ensure autoplay
    } else {
      audio.pause();
    }

    return () => {
      document.removeEventListener("click", playAudio);
      audio.pause();
    };
  }, [isPlaying]);

  return null;
};

export default AudioPlayer;
