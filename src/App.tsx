import React from "react";
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
  return (
    <UIProvider> 
      <GameProvider> 
        <BalanceProvider>
          <AudioPlayer />
          <Header />
          <Main />
        </BalanceProvider>
      </GameProvider>
    </UIProvider>
  );
}

export default App;
