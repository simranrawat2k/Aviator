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
    const roundTimer = setTimeout(() => {
      setRoundStart(false);
  
      // Start another timer when roundStart becomes true
      const planeTimer = setTimeout(() => {
        setIsPlaneOff(true);
      }, 10000);
  
      return () => clearTimeout(planeTimer); // Cleanup plane timer on unmount
    }, 1000);
  
    return () => clearTimeout(roundTimer); // Cleanup round timer on unmount
  }, []);
  

  return (
    <Container>
      <Sidebar>
        <Users />
      </Sidebar>
      <RightSection>
        <GraphContainer>
          <Graph roundStart={roundStart} isPlaneOff = {isPlaneOff}/>
        </GraphContainer>
        <BetPanel>
          <BetPlane roundStart={roundStart} isPlaneOff = {isPlaneOff}/>
        </BetPanel>
      </RightSection>
    </Container>
  );
};

export default Main;
