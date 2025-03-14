import React, { useEffect, useState } from "react";

const AxisDots: React.FC = () => {
  const dotSize = 4; // Reduced dot size
  const speed = 1.2; // Speed of dots moving left and down
  const interval = 300; // Interval between new dots appearing
  const initialSpacingX = 110; // Spacing between horizontal dots
  const initialSpacingY = 35; // Spacing between vertical dots

  const initialDotCountX = Math.ceil(window.innerWidth / initialSpacingX);
  const initialDotCountY = Math.ceil(window.innerHeight / initialSpacingY);

  const [dotsX, setDotsX] = useState<{ id: number; x: number }[]>([]);
  const [dotsY, setDotsY] = useState<{ id: number; y: number }[]>([]);
  const [startMoving, setStartMoving] = useState(false);

  useEffect(() => {
    const initialDotsX: { id: number; x: number }[] = [];
    let lastDotX = 0;
    for (let i = 0; i < initialDotCountX; i++) {
      lastDotX += initialSpacingX;
      initialDotsX.push({ id: Date.now() + i, x: lastDotX });
    }

    const initialDotsY: { id: number; y: number }[] = [];
    let lastDotY = 0;
    for (let i = 0; i < initialDotCountY; i++) {
      lastDotY += initialSpacingY;
      initialDotsY.push({ id: Date.now() + i, y: lastDotY });
    }

    setDotsX(initialDotsX);
    setDotsY(initialDotsY);

    // Delay movement start by 5 seconds
    const timer = setTimeout(() => {
      setStartMoving(true);
    }, 0); // <-- 5 seconds delay before movement starts

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!startMoving) return; // Do nothing until startMoving is true

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
  }, [startMoving]);

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
