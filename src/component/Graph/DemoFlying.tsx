import React, { useEffect, useRef } from "react";
import airplaneImage from "../../assets/airplane.png";

const FlyingPlane: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const planeSize = 150; 
  const duration = 5000; 

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
    
    function animate(time: number) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
      const x = t * canvas.width;
      const y = canvas.height - (Math.pow(t, 2) * canvas.height * 0.7); 
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      ctx.lineTo(0, canvas.height - (Math.pow(0, 2) * canvas.height * 0.7));
      for (let i = 0; i <= x; i += 5) {
        let yi = canvas.height - (Math.pow(i / canvas.width, 2) * canvas.height * 0.7);
        ctx.lineTo(i, yi);
      }
      ctx.lineTo(x, canvas.height);
      ctx.closePath();
      ctx.fillStyle = "#56020F";
      ctx.fill();
      
      // Draw the red path
      ctx.beginPath();
      ctx.moveTo(0, canvas.height);
      for (let i = 0; i <= x; i += 5) {
        let yi = canvas.height - (Math.pow(i / canvas.width, 2) * canvas.height * 0.7);
        ctx.lineTo(i, yi);
      }
      ctx.strokeStyle = "#E50539";
      ctx.lineWidth = 3;
      ctx.stroke();
      
      // Draw the airplane
      ctx.drawImage(planeImg, x - planeSize / 2, y - planeSize / 2, planeSize, planeSize);
      
      if (t < 1) {
        requestAnimationFrame(animate);
      }
    }
    
    requestAnimationFrame(animate);
  }, []);

  return <canvas ref={canvasRef} style={{ display: "block", margin: "auto", zIndex: "4" }} />;
};

export default FlyingPlane;


// import React from "react";
// import airplaneImage from "../../assets/airplane.png";
// import styled, { keyframes } from "styled-components";

// // Define animation for the plane movement
// const planeMovement = keyframes`
//   0%   { transform: translate(0, 0) rotate(10deg); }      /* Start: bottom-left */
//   35%  { transform: translate(50vw, -200%) rotate(10deg); }  /* Takeoff: move up-right (5s), reach 70% width & 20% from top */
//   55%  { transform: translate(60vw, -60%) rotate(10deg); } /* Move down-right (3s), reach right boundary */
//   75%  { transform: translate(50vw, -200%) rotate(10deg); }  /* Move up-left (3s), back to 50% width */
//   100% { transform: translate(60vw, -60%) rotate(10deg); } /* Move down-right (3s), repeat */
// `;

// const PlaneComponent = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
//   width: 98%;
//   height: 93%;
//   border-left: 2px solid #2c2d30;
//   border-bottom: 2px solid #2c2d30;
//   z-index: 0;
//   overflow: hidden; /* Prevents the plane from going outside */
// `;

// const PlaneImage = styled.img`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 150px;
//   height: 120px;
//   object-fit: cover;
//   transform: rotate(10deg);
//   animation: ${planeMovement} 14s ease-in-out infinite;
// `;

// const FlyingPlane = () => {
//   return (
//     <PlaneComponent>
//       <PlaneImage src={airplaneImage} alt="Airplane" />
//     </PlaneComponent>
//   );
// };

// export default FlyingPlane;





// import React, { useEffect, useRef } from "react";
// import airplaneImage from "../../assets/airplane.png";

// const FlyingPlane: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const planeSize = 150;
//   const segmentDurations = [5000, 3000, 3000]; // Takeoff (once), Decline, Incline
//   const loopDurations = segmentDurations[1] + segmentDurations[2]; // Decline + Incline loop

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
//     let takeoffCompleted = false;

//     function animate(time: number) {
//       if (!startTime) startTime = time;
//       const elapsed = time - startTime;

//       let t = 0, phase = 0;

//       if (!takeoffCompleted && elapsed < segmentDurations[0]) {
//         t = elapsed / segmentDurations[0];
//         phase = 1; // Takeoff
//       } else {
//         takeoffCompleted = true;
//         const loopElapsed = (elapsed - segmentDurations[0]) % loopDurations;
//         if (loopElapsed < segmentDurations[1]) {
//           t = loopElapsed / segmentDurations[1];
//           phase = 2; // Decline
//         } else {
//           t = (loopElapsed - segmentDurations[1]) / segmentDurations[2];
//           phase = 3; // Incline
//         }
//       }

//       let x = 0, y = 0;

//       const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
    
//       if (phase === 1) {
//         x = t * canvas.width;
//         y = canvas.height - (Math.pow(t, 2) * canvas.height * 0.7);
//       } else if (phase === 2) {
//         x = canvas.width + t * 50;
//         y = (canvas.height * 0.3) + t * (canvas.height * 0.4);
//       } else if (phase === 3) {
//         x = canvas.width + 50 - t * 50;
//         y = (canvas.height * 0.7) - t * (canvas.height * 0.4);
//       }

//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       ctx.beginPath();
//       ctx.moveTo(0, canvas.height);
//       for (let i = 0; i <= x; i += 5) {
//         let yi = canvas.height;
//         if (i <= canvas.width) {
//           yi = canvas.height - (Math.pow(i / canvas.width, 2) * canvas.height * 0.7);
//         } else {
//           yi = phase === 2
//             ? (canvas.height * 0.3) + ((i - canvas.width) / 50) * (canvas.height * 0.4)
//             : (canvas.height * 0.7) - ((i - canvas.width) / 50) * (canvas.height * 0.4);
//         }
//         ctx.lineTo(i, yi);
//       }
//       ctx.strokeStyle = "#E50539";
//       ctx.lineWidth = 3;
//       ctx.stroke();

//       ctx.drawImage(planeImg, x - planeSize / 2, y - planeSize / 2, planeSize, planeSize);

//       requestAnimationFrame(animate);
//     }

//     requestAnimationFrame(animate);
//   }, []);

//   return <canvas ref={canvasRef} style={{ display: "block", margin: "auto" }} />;
// };

// export default FlyingPlane;






// import React, { useEffect, useRef } from "react";
// import styled from "styled-components";
// import airplaneImage from "../../assets/airplane.png";

// const PlaneComponent = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
//   width: 98%;
//   height: 93%;
//   border-left: 2px solid #2c2d30;
//   border-bottom: 2px solid #2c2d30;
//   z-index: 0;
//   overflow: hidden; /* Prevents the plane from going outside */
// `;

// const FlyingPlane: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const planeSize = 150;
//   const duration1 = 5000; // First phase: 5 sec
//   const duration2 = 3000; // Second phase: 3 sec
//   const widthFactor1 = 0.7; // First phase: 70% width
//   const widthFactor2 = 0.9; // Second phase: 90% width
//   const heightFactor1 = 0.7; // First phase: Upward curve
//   const heightFactor2 = 0.55; // Second phase: Slight downward

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = canvas.parentElement?.clientWidth || 900;
//     canvas.height = canvas.parentElement?.clientHeight || 300;

//     const maxWidth1 = canvas.width * widthFactor1;
//     const maxWidth2 = canvas.width * widthFactor2;
//     const planeImg = new Image();
//     planeImg.src = airplaneImage;

//     let startTime: number | null = null;

//     planeImg.onload = () => {
//       function animate(time: number) {
//         if (!canvas) return;
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;

//         if (!startTime) startTime = time;
//         const elapsed = time - startTime;

//         ctx.clearRect(0, 0, canvas.width, canvas.height);

//         let x, y;

//         if (elapsed < duration1) {
//           // Phase 1: Move up to 70% width
//           const t = elapsed / duration1;
//           x = t * maxWidth1;
//           y = canvas.height - Math.pow(t, 2) * canvas.height * heightFactor1;
//         } else {
//           // Phase 2: Smoothly transition downward to 90% width
//           const t = (elapsed - duration1) / duration2;
//           x = maxWidth1 + t * (maxWidth2 - maxWidth1);

//           // Blend the curves smoothly instead of making a sharp transition
//           const yStart = canvas.height - Math.pow(1, 2) * canvas.height * heightFactor1; // End point of Phase 1
//           const yEnd = canvas.height - (canvas.height * heightFactor2) + 40; // New downward position
//           y = yStart + t * (yEnd - yStart); // Linear transition between end of Phase 1 and new Phase 2
//         }

//         // Draw background shape
//         ctx.beginPath();
//         ctx.moveTo(0, canvas.height);
//         for (let i = 0; i <= x; i += 5) {
//           let yi;
//           if (i <= maxWidth1) {
//             yi = canvas.height - Math.pow(i / maxWidth1, 2) * canvas.height * heightFactor1;
//           } else {
//             const t2 = (i - maxWidth1) / (maxWidth2 - maxWidth1);
//             const yStart = canvas.height - Math.pow(1, 2) * canvas.height * heightFactor1;
//             const yEnd = canvas.height - (canvas.height * heightFactor2) + 40;
//             yi = yStart + t2 * (yEnd - yStart);
//           }
//           ctx.lineTo(i, yi);
//         }
//         ctx.lineTo(x, canvas.height);
//         ctx.closePath();
//         ctx.fillStyle = "#56020F";
//         ctx.fill();

//         // Draw the path line
//         ctx.beginPath();
//         ctx.moveTo(0, canvas.height);
//         for (let i = 0; i <= x; i += 5) {
//           let yi;
//           if (i <= maxWidth1) {
//             yi = canvas.height - Math.pow(i / maxWidth1, 2) * canvas.height * heightFactor1;
//           } else {
//             const t2 = (i - maxWidth1) / (maxWidth2 - maxWidth1);
//             const yStart = canvas.height - Math.pow(1, 2) * canvas.height * heightFactor1;
//             const yEnd = canvas.height - (canvas.height * heightFactor2) + 40;
//             yi = yStart + t2 * (yEnd - yStart);
//           }
//           ctx.lineTo(i, yi);
//         }
//         ctx.strokeStyle = "#E50539";
//         ctx.lineWidth = 3;
//         ctx.stroke();

//         // Draw the airplane
//         ctx.drawImage(planeImg, x - planeSize / 2, y - planeSize / 2, planeSize, planeSize);

//         if (elapsed < duration1 + duration2) {
//           requestAnimationFrame(animate);
//         }
//       }

//       requestAnimationFrame(animate);
//     };

//     return () => {
//       startTime = null; // Cleanup
//     };
//   }, []);

//   return (
//     <PlaneComponent>
//       <canvas ref={canvasRef} style={{ display: "block", position: "absolute", top: 0, left: 0 }} />
//     </PlaneComponent>
//   );
// };

// export default FlyingPlane;






// import React, { useEffect, useRef } from "react";
// import styled from "styled-components";
// import airplaneImage from "../../assets/airplane.png";

// const PlaneComponent = styled.div`
//   position: absolute;
//   top: 0;
//   right: 0;
//   width: 98%;
//   height: 93%;
//   border-left: 2px solid #2c2d30;
//   border-bottom: 2px solid #2c2d30;
//   z-index: 0;
//   overflow: hidden;
// `;

// const FlyingPlane: React.FC = () => {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const planeSize = 150;
//   const duration1 = 5000;
//   const duration2 = 3000;
//   const widthFactor1 = 0.7;
//   const widthFactor2 = 0.9;
//   const heightFactor1 = 0.7;
//   const heightFactor2 = 0.55;

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     canvas.width = canvas.parentElement?.clientWidth || 900;
//     canvas.height = canvas.parentElement?.clientHeight || 300;

//     const maxWidth1 = canvas.width * widthFactor1;
//     const maxWidth2 = canvas.width * widthFactor2;
//     const planeImg = new Image();
//     planeImg.src = airplaneImage;

//     let startTime: number | null = null;

//     planeImg.onload = () => {
//       const animate = (time: number) => {
//         if (!canvas) return;
//         const ctx = canvas.getContext("2d");
//         if (!ctx) return;
      
//         if (!startTime) startTime = time;
//         const elapsed = time - startTime;
      
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//         let x, y;
      
//         // Handle upward curve in phase 1
//         if (elapsed < duration1) {
//           const t = elapsed / duration1;
//           x = t * maxWidth1;
//           y = canvas.height - Math.pow(t, 2) * canvas.height * heightFactor1;
//         } else {
//           // Handle downward curve in phase 2
//           const t = (elapsed - duration1) / duration2;
//           x = maxWidth1 + t * (maxWidth2 - maxWidth1);
      
//           const yStart = canvas.height - Math.pow(1, 2) * canvas.height * heightFactor1; // End point of Phase 1
//           const yEnd = canvas.height - (canvas.height * heightFactor2) + 40; // New downward position
//           y = yStart + t * (yEnd - yStart); // Linear transition between end of Phase 1 and new Phase 2
//         }
      
//         // Draw background shape
//         ctx.beginPath();
//         ctx.moveTo(0, canvas.height);
//         for (let i = 0; i <= x; i += 5) {
//           let yi;
//           if (i <= maxWidth1) {
//             yi = canvas.height - Math.pow(i / maxWidth1, 2) * canvas.height * heightFactor1;
//           } else {
//             const t2 = (i - maxWidth1) / (maxWidth2 - maxWidth1);
//             const yStart = canvas.height - Math.pow(1, 2) * canvas.height * heightFactor1;
//             const yEnd = canvas.height - (canvas.height * heightFactor2) + 40;
//             yi = yStart + t2 * (yEnd - yStart);
//           }
//           ctx.lineTo(i, yi);
//         }
//         ctx.lineTo(x, canvas.height);
//         ctx.closePath();
//         ctx.fillStyle = "#56020F";
//         ctx.fill();
      
//         // Draw the path line (string)
//         ctx.beginPath();
//         ctx.moveTo(0, canvas.height);
//         for (let i = 0; i <= x; i += 5) {
//           let yi;
//           if (i <= maxWidth1) {
//             yi = canvas.height - Math.pow(i / maxWidth1, 2) * canvas.height * heightFactor1;
//           } else {
//             const t2 = (i - maxWidth1) / (maxWidth2 - maxWidth1);
//             const yStart = canvas.height - Math.pow(1, 2) * canvas.height * heightFactor1;
//             const yEnd = canvas.height - (canvas.height * heightFactor2) + 40;
//             yi = yStart + t2 * (yEnd - yStart);
//           }
//           ctx.lineTo(i, yi);
//         }
//         ctx.lineTo(x, y); // Draw the string to the kite's position
//         ctx.strokeStyle = "#E50539";
//         ctx.lineWidth = 3;
//         ctx.stroke();
      
//         // Draw the airplane (kite) image
//         ctx.drawImage(planeImg, x - planeSize / 2, y - planeSize / 2, planeSize, planeSize);
      
//         if (elapsed < duration1 + duration2) {
//           requestAnimationFrame(animate);
//         }
//       };
      

//       requestAnimationFrame(animate);
//     };

//     return () => {
//       startTime = null;
//     };
//   }, []);

//   return (
//     <PlaneComponent>
//       <canvas ref={canvasRef} style={{ display: "block", position: "absolute", top: 0, left: 0 }} />
//     </PlaneComponent>
//   );
// };

// export default FlyingPlane;



