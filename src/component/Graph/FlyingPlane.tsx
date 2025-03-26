import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import KiteImage from "../../assets/airplane.png";
import { useGameContext } from "../../context/GameContext"; 

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

  @media (max-width: 420px) {
    width: 97%;
  }

   @media (max-width: 380px) {
    width: 96%;
  }
`;

const FlyingKite: React.FC = () => {
  const { gameState } = useGameContext(); // Getting game state from context
  const { status, isPlaneOff } = gameState; // Extracting required values

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [lastKitePosition, setLastKitePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  // // const kiteSize = 150; // above 800px
  // const kiteSize = 100; // from 320 to 800px
  // // const duration = 4000; // above 800px
  // const duration = 3000;// from 320 to 800px

   // State to hold dynamic values based on screen size
   const [config, setConfig] = useState({
    kiteSize: 100,
    duration: 3000,
    peakX: 0.55,
    peakY: 0.25,
    endX: 0.75,
    endY: 0.5,
    translateX: 40,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
  
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
  
    // Set actual canvas resolution to match the container's size
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
  }, []);
  



   // Effect to update config based on screen width
   useEffect(() => {
    const updateConfig = () => {
      if (window.innerWidth > 800) {
        setConfig({
          kiteSize: 150,
          duration: 4000,
          peakX: 0.7,
          peakY: 0.25,
          endX: 0.85,
          endY: 0.6,
          translateX: 50,
        });
      } else {
        setConfig({
          kiteSize: 100,
          duration: 3000,
          peakX: 0.55,
          peakY: 0.25,
          endX: 0.75,
          endY: 0.5,
          translateX: 40,
        });
      }
    };

    updateConfig();
    window.addEventListener("resize", updateConfig);
    return () => window.removeEventListener("resize", updateConfig);
  }, []);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let startTime: number | null = null;
    let isMovingDown = false;
    let isReturning = false;
    let kitePosition = lastKitePosition || { x: 0, y: canvas.height };
    //above 800px
    // let peakY = canvas.height * 0.25;
    // let peakX = canvas.width * 0.7;
    // let endX = canvas.width * 0.85;
    // let endY = canvas.height * 0.6;


    // from 320 to 800px
    // let peakY = canvas.height * 0.25;
    // let peakX = canvas.width * 0.55;
    // let endX = canvas.width * 0.75;
    // let endY = canvas.height * 0.5;

    let peakX = canvas.width * config.peakX;
    let peakY = canvas.height * config.peakY;
    let endX = canvas.width * config.endX;
    let endY = canvas.height * config.endY;

    const kiteImg = new Image();
    kiteImg.src = KiteImage;

    kiteImg.onload = () => {
      // Clear any existing timeout
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      // Do not start animation if status is 2
      if (status === 2) return;////////////////////////////


      const startAnimation = () => {
        function animate(time: number) {
          if (!startTime) startTime = time;
          const elapsed = time - startTime;
          const t = Math.min(elapsed / config.duration, 1);

          if (!canvas) return;
          const ctx = canvas.getContext("2d");
          if (!ctx) return;

          if (isPlaneOff) {
            kitePosition.x += 10;
          } else {
            if (!isMovingDown && !isReturning) {
              kitePosition.x = (1 - t) * 0 + t * peakX;
              kitePosition.y = (1 - t) * canvas.height + t * peakY;
              if (t >= 1) {
                isMovingDown = true;
                startTime = time;
              }
            } else if (isMovingDown && !isReturning) {
              const downT = Math.min((time - startTime) / config.duration, 1);
              kitePosition.x = (1 - downT) * peakX + downT * endX;
              kitePosition.y = (1 - downT) * peakY + downT * endY;
              if (downT >= 1) {
                isReturning = true;
                startTime = time;
              }
            } else if (isReturning) {
              const returnT = Math.min((time - startTime) / config.duration, 1);
              kitePosition.x = (1 - returnT) * endX + returnT * peakX;
              kitePosition.y = (1 - returnT) * endY + returnT * peakY;
              if (returnT >= 1) {
                isMovingDown = true;
                isReturning = false;
                startTime = time;
              }
            }
          }

          setLastKitePosition({ x: kitePosition.x, y: kitePosition.y });

          ctx.clearRect(0, 0, canvas.width, canvas.height);

          if (!isPlaneOff) {
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

            ctx.strokeStyle = "#D30D39";
            ctx.lineWidth = 5;
            ctx.stroke();

            ctx.lineTo(kitePosition.x, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.closePath();
            ctx.fillStyle = "#56050F";
            ctx.fill();
          }

          ctx.save();
          // above 800px 
          // ctx.translate(kitePosition.x + 50, kitePosition.y - 20);

          // from 320 to 800px
          // ctx.translate(kitePosition.x + 40, kitePosition.y - 20);
          
          ctx.translate(kitePosition.x + config.translateX, kitePosition.y - 20);
          ctx.rotate((20 * Math.PI) / 180);
          ctx.drawImage(kiteImg, -config.kiteSize / 2, -config.kiteSize / 2, config.kiteSize, config.kiteSize);
          ctx.restore();

          requestAnimationFrame(animate);
        }

        requestAnimationFrame(animate);
      };

      // Start animation IMMEDIATELY for status 3 and 4//////////////
      if (status === 3 || status === 4) {
        startAnimation();
      }

       if (true) {
         startAnimation();
      }
    };

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [status, isPlaneOff, config]);

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
