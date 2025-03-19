import React, { useState, useEffect } from "react";
import Header from "./component/Header";
import Loader from "./component/Loader";
import Graph from "./component/Graph";
import Main from "./component/Main";
import MovingDots from "./component/Demo";
import AudioPlayer from "./component/AudioPlayer";
import { BalanceProvider } from "./context/BalanceContext";

function App() {
  return (
    <div>
      <BalanceProvider>
        <AudioPlayer />
        <Header />
        <Main />
      </BalanceProvider>
    </div>
  );
}

export default App;
