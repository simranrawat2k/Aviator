import React, { useState, useEffect } from "react";
import styled from "styled-components";

const PointsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100%;
  height: 100%;
`;

const PointsContainer = styled.div<{ endTime: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  position: relative;
  text-align: center;

  /* Initial blue background */
  background: radial-gradient(circle, rgba(52, 180, 255, 0.3) 0%, rgba(26, 59, 85, 0) 60%);
  
  /* Transition for background color */
  transition: background 5s ease-in-out; /* Increased duration to 5s */

  /* Use useEffect to trigger background color change */
  ${({ endTime }) => 
    endTime && `
      background: radial-gradient(circle, rgba(137, 59, 233, 0.3) 0%, rgba(26, 59, 85, 0) 60%); /* Purple */
  `}
`;


const PointsText = styled.div<{ endTime: boolean }>`
  font-size: 95px;
  line-height: 40px;
  font-family: "Inter", sans-serif;
  color: ${({ endTime }) => (endTime ? "#F7001F" : "white")};
  font-weight: bold;
  padding: 10px 20px;
`;

const Message = styled.div`
  font-size: 40px;
  font-family: "Inter", sans-serif;
  color: white;
  margin-bottom: 30px;
  font-weight: normal; /* Remove bold */
`;

const Points = () => {
  const [points, setPoints] = useState(1.00);
  const [endTime, setEndTime] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((prevPoints) => {
        if (prevPoints < 10.00) {
          return Math.min(prevPoints + 0.01, 10.00); // Ensure it doesn't go above 10
        }
        return prevPoints;
      });
    }, 100);

    // Stop after 20 seconds
    const timeout = setTimeout(() => {
      clearInterval(timer);
      setEndTime(true); // Set endTime to true after 10 seconds to trigger color change
    }, 10000); 

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <PointsWrapper>
      <PointsContainer endTime={endTime}>
        {endTime && <Message>FLEW AWAY!</Message>} {/* Display the message when time ends */}
        <PointsText endTime={endTime}>{points.toFixed(2)}x</PointsText> {/* Format number to 2 decimal places */}
      </PointsContainer>
    </PointsWrapper>
  );
};

export default Points;
