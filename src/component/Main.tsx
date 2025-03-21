import React, { useEffect, useState } from "react";
import Users from "./Users";
import Graph from "./Graph";
import BetPlane from "./BetPanel";
import { Box } from "@mui/material";
import styled from "styled-components";

const HEADER_HEIGHT = 50;

const Container = styled(Box)`
  display: flex;
  height: calc(100vh - ${HEADER_HEIGHT}px);
  width: 100%;

  @media (max-width: 1000px) {
    flex-direction: column;
  }
`;

const Sidebar = styled(Box)`
  width: 26%;
  background-color: #101011;
  color: white;
  padding: 16px;

  @media (max-width: 1000px) {
    width: 100%;
    order: 3;
  }
`;

const RightSection = styled(Box)`
  width: 74%;
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const GraphContainer = styled(Box)`
  flex-grow: 1;
  background-color: #101011;

  @media (max-width: 1000px) {
    order: 1;
  }
`;

const BetPanel = styled(Box)`
  height: 30%;
  background-color: #101011;
  padding: 2px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1000px) {
    order: 2;
    height: auto;
  }

  @media (max-width: 700px) {
    flex-direction: row;
  }
`;

const Main: React.FC = () => {
  const [roundStart, setRoundStart] = useState(true);
  const [isPlaneOff, setIsPlaneOff] = useState(false);

  useEffect(() => {
    let roundTimer: NodeJS.Timeout;
    let planeTimer: NodeJS.Timeout;
    let restartTimer: NodeJS.Timeout;

    const startRoundCycle = () => {
      setRoundStart(true);
      setIsPlaneOff(false);

      roundTimer = setTimeout(() => {
        setRoundStart(false);

        // Generate a random float between 0.0 and 10.0 seconds
        // write 20 to generate points between 0.00 to 3.00
        const randomFlyOffTime = Math.random() * 10;
        console.log(`Plane will fly off in: ${randomFlyOffTime.toFixed(1)} seconds`);

        planeTimer = setTimeout(() => {
          setIsPlaneOff(true);

          restartTimer = setTimeout(() => {
            startRoundCycle();
          }, 5000); // Restart cycle
        }, randomFlyOffTime * 1000); // Convert to milliseconds
      }, 3000); // Loader time
    };

    startRoundCycle(); // Start the cycle on mount

    return () => {
      clearTimeout(roundTimer);
      clearTimeout(planeTimer);
      clearTimeout(restartTimer);
    };
  }, []);

  return (
    <Container>
      <Sidebar>
        <Users />
      </Sidebar>
      <RightSection>
        <GraphContainer>
          <Graph roundStart={roundStart} isPlaneOff={isPlaneOff} />
        </GraphContainer>
        <BetPanel>
          <BetPlane roundStart={roundStart} isPlaneOff={isPlaneOff} />
        </BetPanel>
      </RightSection>
    </Container>
  );
};

export default Main;
