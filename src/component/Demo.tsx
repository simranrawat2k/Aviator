import React, { useEffect, useState } from "react";

const MovingDots: React.FC = () => {
  const dotSize = 6; // Reduced dot size
  const speed = 1.2; // Speed of dots moving left and down
  const interval = 300; // Interval between new dots appearing
  const initialSpacingX = 110; // Spacing between horizontal dots
  const initialSpacingY = 35; // Spacing between vertical dots
  const initialDotCountX = Math.ceil(window.innerWidth / initialSpacingX);
  const initialDotCountY = Math.ceil(window.innerHeight / initialSpacingY);

  const [dotsX, setDotsX] = useState<{ id: number; x: number }[]>(
    Array.from({ length: initialDotCountX }, (_, i) => ({ id: i, x: window.innerWidth - i * initialSpacingX }))
  );

  const [dotsY, setDotsY] = useState<{ id: number; y: number }[]>(
    Array.from({ length: initialDotCountY }, (_, i) => ({ id: i, y: i * initialSpacingY }))
  );

  const [startMoving, setStartMoving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStartMoving(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!startMoving) return;

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
      setDotsX((prev) => prev.map(dot => ({ ...dot, x: dot.x - speed })).filter(dot => dot.x > -dotSize));
    };

    const moveDotsY = () => {
      setDotsY((prev) => prev.map(dot => ({ ...dot, y: dot.y + speed })).filter(dot => dot.y < window.innerHeight + dotSize));
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
    <div style={{ overflow: "hidden", position: "relative", width: "100vw", height: "100vh", background: "black" }}>
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

export default MovingDots;
