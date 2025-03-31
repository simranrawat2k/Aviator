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
import AuthPage from "./component/AuthPage";
import FullLoader from "./component/FullLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./context/UserContext";

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleAudio = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <UserProvider>
      <GameProvider>
        <BalanceProvider>
          {loading ? (
            <FullLoader />
          ) : isAuthenticated ? (
            <>
              <AudioPlayer isPlaying={isPlaying} />
              <Header toggleAudio={toggleAudio} isPlaying={isPlaying} />
              <Main />
            </>
          ) : (
            <AuthPage setIsAuthenticated={setIsAuthenticated} setLoading={setLoading} />
          )}
            <ToastContainer position="top-right" autoClose={3000} />
            
        </BalanceProvider>
      </GameProvider>
      </UserProvider>
  );
}


export default App;
