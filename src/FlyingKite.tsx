import React, { useEffect, useRef } from "react";

const FlyingKite: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const kiteSize = 50;
  const duration = 5000;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 900;
    canvas.height = 400;

    let startTime: number | null = null;
    let isMovingDown = false;
    let isReturning = false;
    let kitePosition = { x: 0, y: canvas.height };
    let peakY = canvas.height * 0.2;
    let peakX = canvas.width * 0.5;
    let endX = canvas.width * 0.7;
    let endY = canvas.height * 0.4;

    function animate(time: number) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);

      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (!isMovingDown && !isReturning) {
        // Move from A to B
        kitePosition.x = (1 - t) * 0 + t * peakX;
        kitePosition.y = (1 - t) * canvas.height + t * peakY;
        if (t >= 1) {
          isMovingDown = true;
          startTime = time;
        }
      } else if (isMovingDown && !isReturning) {
        // Move from B to C
        const downT = Math.min((time - startTime) / duration, 1);
        kitePosition.x = (1 - downT) * peakX + downT * endX;
        kitePosition.y = (1 - downT) * peakY + downT * endY;
        if (downT >= 1) {
          isReturning = true;
          startTime = time;
        }
      } else if (isReturning) {
        // Move from C to B
        const returnT = Math.min((time - startTime) / duration, 1);
        kitePosition.x = (1 - returnT) * endX + returnT * peakX;
        kitePosition.y = (1 - returnT) * endY + returnT * peakY;
        if (returnT >= 1) {
          isMovingDown = true;
          isReturning = false;
          startTime = time;
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // U-Shaped Curved String
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.bezierCurveTo(
        kitePosition.x * 0.25,
        kitePosition.y + 150,
        kitePosition.x * 0.75,
        kitePosition.y + 150,
        kitePosition.x,
        kitePosition.y
      );
      ctx.strokeStyle = "#000000";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Kite
      ctx.beginPath();
      ctx.rect(
        kitePosition.x - kiteSize / 2,
        kitePosition.y - kiteSize / 2,
        kiteSize,
        kiteSize
      );
      ctx.fillStyle = "#FF6347";
      ctx.fill();

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block", margin: "auto", zIndex: "4" }} />;
};

export default FlyingKite;
