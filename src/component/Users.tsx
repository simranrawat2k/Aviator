import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components"; 
import { useGameContext } from "../context/GameContext";


const TabsContainer = styled.div`
  display: flex;
  width: 260px;
  background: #101011;
  border: 1px solid #2C2D30;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  margin-top:10px;
`;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  text-align: center;
  padding: 3px 30px;
  cursor: pointer;
  color: #FFFFFF;
  position: relative;
  z-index: 2;
  font-size: 12px;
  transition: color 0.4s ease-in-out;
`;

const ActiveTabIndicator = styled.div<{ position: number }>`
  position: absolute;
  top: 0;
  left: ${(props) => (props.position === 0 ? "0" : "50%")};
  width: 50%;
  height: 100%;
  background: #2C2D30;
  border-radius: 28px;
  transition: left 0.5s ease-in-out;
  z-index: 1;
`;

const ContentContainer = styled.div`
  margin-top: 20px;
  padding: 10px;
  margin:10px;
  background: #2C2D30;
  color: #FFFFFF;
  border-radius: 10px;
  text-align: center;
`;

export default function Users() {
  const [activeTab, setActiveTab] = useState(0);
  const { gameState } = useGameContext();
  return (
    <>
      <TabsContainer>
        <ActiveTabIndicator position={activeTab} />
        <Tab active={activeTab === 0} onClick={() => setActiveTab(0)}>
          All Bets
        </Tab>
        <Tab active={activeTab === 1} onClick={() => setActiveTab(1)}>
          My Bets
        </Tab>
      </TabsContainer>
      <ContentContainer>
        {activeTab === 0 ? (
          <>
            <p>All Bets Content</p>
            <p><strong>Game Status:</strong> {gameState.status}</p>
            <p><strong>Multiplier:</strong> {gameState.multiplier}</p>
            <p><strong>Round ID:</strong> {gameState.roundId}</p>
            <p><strong>Round Start:</strong> {gameState.roundStart ? "Yes" : "No"}</p>
            <p><strong>Is Plane Off:</strong> {gameState.isPlaneOff ? "Yes" : "No"}</p>
          </>
        ) : (
          <>
            <p>My Bets Content</p>
            <p><strong>Game Status:</strong> {gameState.status}</p>
            <p><strong>Multiplier:</strong> {gameState.multiplier}</p>
            <p><strong>Round Start:</strong> {gameState.roundStart ? "Yes" : "No"}</p>
            <p><strong>Is Plane Off:</strong> {gameState.isPlaneOff ? "Yes" : "No"}</p>
          </>
        )}
      </ContentContainer>
    </>
  );
}
