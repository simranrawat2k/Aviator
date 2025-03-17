import { useEffect, useState } from "react";
import aviatorSound from "../assets/aviator-sound.mp3"; // Import MP3 file

const AudioPlayer: React.FC = () => {
  const [isAudioAllowed, setIsAudioAllowed] = useState(false);

  useEffect(() => {
    const audio = new Audio(aviatorSound);
    audio.loop = true; // Keep playing continuously

    // Function to start audio on first user click
    const enableAudioOnClick = () => {
      audio.play().catch((err) => console.log("Autoplay blocked:", err));
      setIsAudioAllowed(true); // Mark that audio has started
      document.removeEventListener("click", enableAudioOnClick); // Remove listener after first click
    };

    // Listen for first user click
    document.addEventListener("click", enableAudioOnClick);

    // Stop audio when the tab/window is closed or refreshed
    const stopAudio = () => {
      audio.pause();
      audio.currentTime = 0;
    };
    window.addEventListener("beforeunload", stopAudio);

    return () => {
      stopAudio(); // Cleanup
      window.removeEventListener("beforeunload", stopAudio);
      document.removeEventListener("click", enableAudioOnClick);
    };
  }, []);

  return null; // No UI needed
};

export default AudioPlayer;
