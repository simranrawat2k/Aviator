import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useGameContext } from "../../context/GameContext";

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
  font-size: 100px;
  line-height: 40px;
  font-family: "Inter", sans-serif;
  color: ${({ endTime }) => (endTime ? "#F7001F" : "white")};
  font-weight: bold;
  padding: 10px 20px;

  @media (max-width: 650px){
   font-size: 65px;
  }
`;

const Message = styled.div`
  font-size: 40px;
  font-family: "Inter", sans-serif;
  color: white;
  margin-bottom: 30px;
  font-weight: normal;

   @media (max-width: 650px){
   font-size: 28px;
  }

`;

interface GraphProps {
  roundStart: boolean;
  isPlaneOff: boolean;
}




const Points: React.FC = () => {
  const { gameState } = useGameContext();
  const [endTime, setEndTime] = useState(false);

  useEffect(() => {
    

    if (gameState.status === 2) {
      setEndTime(false);
    }

    if (gameState.status === 4) {
      setEndTime(true);
      localStorage.setItem(
        "point",
        JSON.stringify({ id: Date.now(), points: parseFloat(gameState.multiplier.toFixed(2)) })
      );
    }
  }, [gameState.status]);

  return (
    <PointsWrapper>
      <PointsContainer endTime={endTime}>
        {endTime && <Message>FLEW AWAY!</Message>}
        <PointsText endTime={endTime}>{gameState.multiplier.toFixed(2)}x</PointsText>
      </PointsContainer>
    </PointsWrapper>
  );
};





export default Points;

