import { useEffect, useState } from "react";
import aviatorSound from "../assets/aviator-sound.mp3"; 

const AudioPlayer: React.FC = () => {
  const [isAudioAllowed, setIsAudioAllowed] = useState(false);

  useEffect(() => {
    const audio = new Audio(aviatorSound);
    audio.loop = true; 

    const enableAudioOnClick = () => {
      audio.play().catch((err) => console.log("Autoplay blocked:", err));
      setIsAudioAllowed(true); 
      document.removeEventListener("click", enableAudioOnClick);
    };

    document.addEventListener("click", enableAudioOnClick);

    const stopAudio = () => {
      audio.pause();
      audio.currentTime = 0;
    };
    window.addEventListener("beforeunload", stopAudio);

    return () => {
      stopAudio(); 
      window.removeEventListener("beforeunload", stopAudio);
      document.removeEventListener("click", enableAudioOnClick);
    };
  }, []);

  return null; 
};

export default AudioPlayer;
