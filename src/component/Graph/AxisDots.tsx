import React, { useState, useEffect, useRef } from "react";
import { useGameContext } from "../../context/GameContext";

const AxisDots: React.FC = () => {
  const { gameState } = useGameContext();
  const dotSize = 4;
  const speed = 1.2;
  const interval = 300;
  const initialSpacingX = 110; // Adjust spacing as needed
  const initialSpacingY = 35;  // Adjust spacing as needed

  const initialDotCountX = Math.ceil(window.innerWidth / initialSpacingX);
  const initialDotCountY = Math.ceil(window.innerHeight / initialSpacingY);

  const [dotsX, setDotsX] = useState<{ id: number; x: number }[]>([]);
  const [dotsY, setDotsY] = useState<{ id: number; y: number }[]>([]);

  const lastDotXRef = useRef(initialDotCountX * initialSpacingX);
  const lastDotYRef = useRef(-initialSpacingY); // Start above the screen

  useEffect(() => {
    // Initialize dots with proper spacing
    const initialDotsX = Array.from({ length: initialDotCountX }, (_, i) => ({
      id: Date.now() + i,
      x: i * initialSpacingX,
    }));

    const initialDotsY = Array.from({ length: initialDotCountY }, (_, i) => ({
      id: Date.now() + i,
      y: i * initialSpacingY,
    }));

    setDotsX(initialDotsX);
    setDotsY(initialDotsY);
  }, []);

  useEffect(() => {
    if (gameState.status === 2) return; // Stop movement when status = 2

    const moveDots = () => {
      if (gameState.status === 3 || gameState.status === 4) {
        setDotsX((prev) =>
          prev
            .map((dot) => ({ ...dot, x: dot.x - speed }))
            .filter((dot) => dot.x > -dotSize)
        );

        setDotsY((prev) =>
          prev
            .map((dot) => ({ ...dot, y: dot.y + speed }))
            .filter((dot) => dot.y < window.innerHeight + dotSize) // Remove dots when off-screen
        );
      }
    };

    const addDotX = () => {
      lastDotXRef.current += initialSpacingX;
      setDotsX((prev) => [
        ...prev,
        { id: Date.now(), x: lastDotXRef.current },
      ]);
    };

    const addDotY = () => {
      lastDotYRef.current -= initialSpacingY; // Ensure spacing remains consistent
      setDotsY((prev) => [
        { id: Date.now(), y: lastDotYRef.current },
        ...prev,
      ]);
    };

    const moveDotsInterval = setInterval(moveDots, 20);
    const addDotIntervalX = setInterval(addDotX, interval);
    const addDotIntervalY = setInterval(addDotY, interval/2); // Reduce frequency of vertical dot appearance

    return () => {
      clearInterval(moveDotsInterval);
      clearInterval(addDotIntervalX);
      clearInterval(addDotIntervalY);
    };
  }, [gameState.status]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {dotsX.map((dot) => (
        <div
          key={dot.id}
          style={{
            position: "absolute",
            bottom: "10px",
            left: dot.x,
            width: dotSize,
            height: dotSize,
            backgroundColor: "white",
            borderRadius: "50%",
          }}
        />
      ))}
      {dotsY.map((dot) => (
        <div
          key={dot.id}
          style={{
            position: "absolute",
            left: "10px",
            top: dot.y,
            width: dotSize,
            height: dotSize,
            backgroundColor: "#1081B8",
            borderRadius: "50%",
          }}
        />
      ))}
    </div>
  );
};

export default AxisDots;
