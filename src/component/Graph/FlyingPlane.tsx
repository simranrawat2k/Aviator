// import React, { useEffect, useRef } from "react";
// import airplaneImage from "../assets/airplane.png";

// const Graph: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const planeSize = 150; 
//   const duration = 5000; 

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = 900;
//     canvas.height = 400;
    
//     const planeImg = new Image();
//     planeImg.src = airplaneImage;
    
//     let startTime: number | null = null;
    
//     function animate(time: number) {
//       if (!startTime) startTime = time;
//       const elapsed = time - startTime;
//       const t = Math.min(elapsed / duration, 1);
//       const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//       const x = t * canvas.width;
//       const y = canvas.height - (Math.pow(t, 2) * canvas.height * 0.7); 
      
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      
//       ctx.beginPath();
//       ctx.moveTo(0, canvas.height);
//       ctx.lineTo(0, canvas.height - (Math.pow(0, 2) * canvas.height * 0.7));
//       for (let i = 0; i <= x; i += 5) {
//         let yi = canvas.height - (Math.pow(i / canvas.width, 2) * canvas.height * 0.7);
//         ctx.lineTo(i, yi);
//       }
//       ctx.lineTo(x, canvas.height);
//       ctx.closePath();
//       ctx.fillStyle = "#56020F";
//       ctx.fill();
      
//       // Draw the red path
//       ctx.beginPath();
//       ctx.moveTo(0, canvas.height);
//       for (let i = 0; i <= x; i += 5) {
//         let yi = canvas.height - (Math.pow(i / canvas.width, 2) * canvas.height * 0.7);
//         ctx.lineTo(i, yi);
//       }
//       ctx.strokeStyle = "#E50539";
//       ctx.lineWidth = 3;
//       ctx.stroke();
      
//       // Draw the airplane
//       ctx.drawImage(planeImg, x - planeSize / 2, y - planeSize / 2, planeSize, planeSize);
      
//       if (t < 1) {
//         requestAnimationFrame(animate);
//       }
//     }
    
//     requestAnimationFrame(animate);
//   }, []);

//   return <canvas ref={canvasRef} style={{ display: "block", margin: "auto" }} />;
// };

// export default Graph;




import React, { useEffect, useRef } from "react";
import airplaneImage from "../../assets/airplane.png";

const FlyingPlane: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const planeSize = 150;
  const segmentDurations = [5000, 3000, 3000]; // Takeoff (once), Decline, Incline
  const loopDurations = segmentDurations[1] + segmentDurations[2]; // Decline + Incline loop

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 900;
    canvas.height = 400;

    const planeImg = new Image();
    planeImg.src = airplaneImage;

    let startTime: number | null = null;
    let takeoffCompleted = false;

    function animate(time: number) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;

      let t = 0, phase = 0;

      if (!takeoffCompleted && elapsed < segmentDurations[0]) {
        t = elapsed / segmentDurations[0];
        phase = 1; // Takeoff
      } else {
        takeoffCompleted = true;
        const loopElapsed = (elapsed - segmentDurations[0]) % loopDurations;
        if (loopElapsed < segmentDurations[1]) {
          t = loopElapsed / segmentDurations[1];
          phase = 2; // Decline
        } else {
          t = (loopElapsed - segmentDurations[1]) / segmentDurations[2];
          phase = 3; // Incline
        }
      }

      let x = 0, y = 0;

      const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
      if (phase === 1) {
        x = t * canvas.width;
        y = canvas.height - (Math.pow(t, 2) * canvas.height * 0.7);
      } else if (phase === 2) {
        x = canvas.width + t * 50;
        y = (canvas.height * 0.3) + t * (canvas.height * 0.4);
      } else if (phase === 3) {
        x = canvas.width + 50 - t * 50;
        y = (canvas.height * 0.7) - t * (canvas.height * 0.4);
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i <= x; i += 5) {
        let yi = canvas.height;
        if (i <= canvas.width) {
          yi = canvas.height - (Math.pow(i / canvas.width, 2) * canvas.height * 0.7);
        } else {
          yi = phase === 2
            ? (canvas.height * 0.3) + ((i - canvas.width) / 50) * (canvas.height * 0.4)
            : (canvas.height * 0.7) - ((i - canvas.width) / 50) * (canvas.height * 0.4);
        }
        ctx.lineTo(i, yi);
      }
      ctx.strokeStyle = "#E50539";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.drawImage(planeImg, x - planeSize / 2, y - planeSize / 2, planeSize, planeSize);

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block", margin: "auto" }} />;
};

export default FlyingPlane;



