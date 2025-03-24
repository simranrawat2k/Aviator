import React, { createContext, useContext, useEffect, useState } from "react";

interface GameState {
  status: number;
  roundId: number | null;
  multiplier: number;
  roundStart: boolean;
  isPlaneOff: boolean;
}

interface GameContextType {
  gameState: GameState;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, setGameState] = useState<GameState>({
    status: 1,
    roundId: null,
    multiplier: 1.0,
    roundStart: true,
    isPlaneOff: false,
  });

 

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000");

    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      const updatedGameState: GameState = JSON.parse(event.data);
      
    
      setGameState((prevState) => ({
        ...prevState,
        ...updatedGameState, // Merge new values while keeping old ones
      }));
    };
    

    ws.onclose = () => {
      console.log("Disconnected from WebSocket server");
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <GameContext.Provider value={{ gameState }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
};
