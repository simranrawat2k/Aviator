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

const PointsText = styled.div<{ endTime: boolean }>`
  font-size: 95px;
  line-height: 40px;
  font-family: "Inter", sans-serif;
  color: ${({ endTime }) => (endTime ? "#F7001F" : "white")};
  font-weight: bold;
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
      setEndTime(true); // Set endTime to true after the time ends
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <PointsWrapper>
      {endTime && <Message>FLEW AWAY!</Message>} {/* Display the message when time ends */}
      <PointsText endTime={endTime}>{points.toFixed(2)}x</PointsText> {/* Format number to 2 decimal places */}
    </PointsWrapper>
  );
};

export default Points;
