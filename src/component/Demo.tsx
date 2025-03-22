import React, { useState, useEffect } from "react";
import { useGameContext } from "../context/GameContext";

const AxisDots: React.FC = () => {
  const { gameState } = useGameContext();
  const dotSize = 4;
  const speed = 1.2;
  const interval = 300;
  const initialSpacingX = 110;
  const initialSpacingY = 35;

  const initialDotCountX = Math.ceil(window.innerWidth / initialSpacingX);
  const initialDotCountY = Math.ceil(window.innerHeight / initialSpacingY);

  const [dotsX, setDotsX] = useState<{ id: number; x: number }[]>([]);
  const [dotsY, setDotsY] = useState<{ id: number; y: number }[]>([]);

  useEffect(() => {
    const initialDotsX = Array.from({ length: initialDotCountX }, (_, i) => ({
      id: Date.now() + i,
      x: (i + 1) * initialSpacingX,
    }));

    const initialDotsY = Array.from({ length: initialDotCountY }, (_, i) => ({
      id: Date.now() + i,
      y: (i + 1) * initialSpacingY,
    }));

    setDotsX(initialDotsX);
    setDotsY(initialDotsY);
  }, []);

  useEffect(() => {
    if (gameState.status === 2) return; // Stop movement when status is 2

    let lastDotX = window.innerWidth;
    let lastDotY = 0;

    const addDotX = () => {
      lastDotX += initialSpacingX;
      setDotsX((prev) => [...prev, { id: Date.now(), x: lastDotX }]);
    };

    const addDotY = () => {
      lastDotY -= initialSpacingY;
      setDotsY((prev) => [...prev, { id: Date.now(), y: lastDotY }]);
    };

    const moveDotsX = () => {
      setDotsX((prev) =>
        prev
          .map((dot) => ({ ...dot, x: dot.x - speed }))
          .filter((dot) => dot.x > -dotSize)
      );
    };

    const moveDotsY = () => {
      setDotsY((prev) =>
        prev
          .map((dot) => ({ ...dot, y: dot.y + speed }))
          .filter((dot) => dot.y < window.innerHeight + dotSize)
      );
    };

    const addDotIntervalX = setInterval(addDotX, interval);
    const addDotIntervalY = setInterval(addDotY, interval);
    const moveDotsIntervalX = setInterval(moveDotsX, 20);
    const moveDotsIntervalY = setInterval(moveDotsY, 20);

    return () => {
      clearInterval(addDotIntervalX);
      clearInterval(addDotIntervalY);
      clearInterval(moveDotsIntervalX);
      clearInterval(moveDotsIntervalY);
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
