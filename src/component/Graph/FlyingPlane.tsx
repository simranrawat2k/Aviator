import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import KiteImage from "../../assets/airplane.png";

const PlaneComponent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 98%;
  height: 93%;
  border-left: 2px solid #2c2d30;
  border-bottom: 2px solid #2c2d30;
  z-index: 0;
  overflow: hidden;
`;

const FlyingKite: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const kiteSize = 150;
  const duration = 5000;

  useEffect(() => {
    const resizeCanvas = () => {
      if (!canvasRef.current || !containerRef.current) return;
      const canvas = canvasRef.current;
      const container = containerRef.current;

      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };

    // Resize on mount and on window resize
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime: number | null = null;
    let isMovingDown = false;
    let isReturning = false;
    let kitePosition = { x: 0, y: canvas.height };
    let peakY = canvas.height * 0.2;
    let peakX = canvas.width * 0.7;
    let endX = canvas.width * 0.85;
    let endY = canvas.height * 0.6;

    const kiteImg = new Image();
    kiteImg.src = KiteImage;

    kiteImg.onload = () => {
      function animate(time: number) {
        if (!startTime) startTime = time;
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1);

        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        if (!isMovingDown && !isReturning) {
          kitePosition.x = (1 - t) * 0 + t * peakX;
          kitePosition.y = (1 - t) * canvas.height + t * peakY;
          if (t >= 1) {
            isMovingDown = true;
            startTime = time;
          }
        } else if (isMovingDown && !isReturning) {
          const downT = Math.min((time - startTime) / duration, 1);
          kitePosition.x = (1 - downT) * peakX + downT * endX;
          kitePosition.y = (1 - downT) * peakY + downT * endY;
          if (downT >= 1) {
            isReturning = true;
            startTime = time;
          }
        } else if (isReturning) {
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

        // Draw shaded area **only below the curve**
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
        ctx.lineTo(kitePosition.x, canvas.height); // Drop straight down to close shape
        ctx.closePath(); // Close the filled shape
        ctx.fillStyle = "#53020D";
        ctx.fill();

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw shaded area **below the curve**
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.bezierCurveTo(
          kitePosition.x * 0.25,
          canvas.height - (canvas.height - kitePosition.y) * 0.6,
          kitePosition.x * 0.75,
          kitePosition.y + 100,
          kitePosition.x,
          kitePosition.y
        );
        ctx.lineTo(kitePosition.x, canvas.height); // Ensure it closes at the bottom
        ctx.closePath();
        ctx.fillStyle = "#53020D";
        ctx.fill();

        // Draw the bezier curve (kite string)
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);
        ctx.bezierCurveTo(
          kitePosition.x * 0.25,
          canvas.height - (canvas.height - kitePosition.y) * 0.6,
          kitePosition.x * 0.75,
          kitePosition.y + 100,
          kitePosition.x,
          kitePosition.y
        );
        ctx.strokeStyle = "#D30D39"; // Red color
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw the kite
        // Draw the kite
        ctx.save();
        ctx.translate(kitePosition.x + 50, kitePosition.y - 20); // Shift X by 50px
        ctx.rotate((20 * Math.PI) / 180);
        ctx.drawImage(
          kiteImg,
          -kiteSize / 2,
          -kiteSize / 2,
          kiteSize,
          kiteSize
        );
        ctx.restore();

        requestAnimationFrame(animate);
      }

      requestAnimationFrame(animate);
    };
  }, []);

  return (
    <PlaneComponent ref={containerRef}>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
      />
    </PlaneComponent>
  );
};

export default FlyingKite;
