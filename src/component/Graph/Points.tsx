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
  transition: background 5s ease-in-out;

  /* Change background when endTime is true */
  ${({ endTime }) =>
    endTime &&
    `background: radial-gradient(circle, rgba(137, 59, 233, 0.3) 0%, rgba(26, 59, 85, 0) 60%);`}
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
  font-weight: normal;
`;


interface PointsProps {
  isPlaneOff: boolean; // Ensure this is defined
}

const Points: React.FC<PointsProps> = ({ isPlaneOff }) => {
  const [points, setPoints] = useState(1.0);
  const [endTime, setEndTime] = useState(false);

  useEffect(() => {
    if (isPlaneOff) {
      setEndTime(true); // Stop when stopTimer is true
      return;
    }

    setPoints(1.0); // Reset to 1.00 when starting a new round

    const timer = setInterval(() => {
      setPoints((prevPoints) => Math.min(prevPoints + 0.01, 10.0));
    }, 100);

    return () => clearInterval(timer);
  }, [isPlaneOff]);

  return (
    <PointsWrapper>
      <PointsContainer endTime={endTime}>
        {endTime && <Message>FLEW AWAY!</Message>}
        <PointsText endTime={endTime}>{points.toFixed(2)}x</PointsText>
      </PointsContainer>
    </PointsWrapper>
  );
};

export default Points;
