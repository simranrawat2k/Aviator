import React, { useState } from "react";
import Header from "./component/Header";
import Loader from "./component/Loader";
import Graph from "./component/Graph";
import Main from "./component/Main";
import MovingDots from "./component/Demo";
import AudioPlayer from "./component/AudioPlayer";
import { BalanceProvider } from "./context/BalanceContext";
import { GameProvider } from "./context/GameContext"; 
import { UIProvider } from "./context/uiContext";

function App() {
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <UIProvider> 
      <GameProvider> 
        <BalanceProvider>
          <AudioPlayer isPlaying={isPlaying} />
          <Header toggleAudio={toggleAudio} isPlaying={isPlaying}/>
          <Main />
        </BalanceProvider>
      </GameProvider>
    </UIProvider>
  );
}

export default App;
