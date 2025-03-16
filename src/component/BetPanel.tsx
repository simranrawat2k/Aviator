import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";

const BetPanelContainer = styled(Box)`
  display: flex;
  height: 100%;
  background-color: #101011;
  gap: 2px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

// Bet Section Style
const BetSection = styled(Box)`
  flex: 1;
  margin: 0px;
  text-align: center;
  color: white;
  @media (max-width: 700px) {
    width: 100%;
  }
`;

// Bet One Specific Styling
const BetOneContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #1b1c1d;
  border: 2px solid #2c2d30;
  padding: 10px 16px 30px 16px;
  border-radius: 12px;
  width: 93%;
  gap: 20px;
`;

const BetOneInsideContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap:20px;
`;

const LeftSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const BetControls = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #101011;
  border: 2px solid #2c2d30;
  padding: 0px 8px;
  border-radius: 36px;
`;

const PlusMinusButton = styled(Button).attrs({ disableRipple: true })`
  && {
    width: 20px;
    min-width: 20px; /* Override MUI default min-width */
    height: 20px;
    border-radius: 50%;
    background-color: #747474;
    color: black;
    margin: 6px 15px;
    font-weight: bolder;
    padding: 0; /* Remove default MUI padding */
    text-transform: none; /* Prevents auto-uppercase */

    &:hover {
      background-color: #5e5e5e;
    }
  }
`;

const BetButton = styled(Button).attrs({ disableRipple: true })`
  && {
    width: 8px;
    min-width: 8px; /* Override MUI default min-width */
    height: 20px;
    border-radius: 50%;
    background-color: #747474;
    color: black;
    margin: 6px 15px;
    font-weight: bolder;
    padding: 0; /* Remove default MUI padding */
    text-transform: none; /* Prevents auto-uppercase */

    &:hover {
      background-color: #5e5e5e;
    }
  }
`;

const BetValue = styled(Typography)`
  && {
    text-align: center;
    font-size: 23px;
    font-weight: 700;
    color: white;
  }
`;

const BetAmountButtons = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0px;
  margin-top: 5px;
`;

const AmountButton = styled(Button)`
  && {
    background-color: #141516;
    color: #778a8b;
    font-size: 15px;
    padding: 0px;
    border-radius: 16px;
  }
`;

const RightSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #28a909;
  border: 1px solid rgb(176, 176, 176);
  width: 230px;
  padding: 0px 12px;
  height: 87px;
  border-radius: 20px;
  min-width: 100px;
`;

const BetText = styled.div`
  color: white;
  font-size: 23px;
`;

const BetAmountText = styled(Typography)`
  && {
    color: white;
    font-size: 23px;
    margin-top: 4px;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  width: 200px;
  background: #101011;
  border: 1px solid #2c2d30;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
`;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  text-align: center;
  padding: 3px 30px;
  cursor: pointer;
  color: #ffffff;
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
  background: #2c2d30;
  border-radius: 28px;
  transition: left 0.5s ease-in-out;
  z-index: 1;
`;

const BetPlane: React.FC = () => {
  const [betValue, setBetValue] = useState(10.0);
  const [activeTab, setActiveTab] = useState(0);
  const [activeTabTwo, setActiveTabTwo] = useState(0);
  const [isWaiting, setIsWaiting] = useState(false);

  const handleBetChange = (amount: number) => {
    setBetValue(amount);
  };

  return (
    <BetPanelContainer>
      {/* Bet One */}
      <BetSection>
        <BetOneContainer>
          {/* Left Side - Bet Controls */}
          <TabsContainer>
            <ActiveTabIndicator position={activeTab} />
            <Tab active={activeTab === 0} onClick={() => setActiveTab(0)}>
              Bet
            </Tab>
            <Tab active={activeTab === 1} onClick={() => setActiveTab(1)}>
              Auto
            </Tab>
          </TabsContainer>
          {activeTab === 0 ? <BetOneInsideContainer>
          <LeftSection>
            <BetControls>
              <PlusMinusButton
                onClick={() => setBetValue((prev) => Math.max(1, prev - 1))}
              >
                −
              </PlusMinusButton>
              <BetValue>{betValue.toFixed(2)}</BetValue>
              <PlusMinusButton onClick={() => setBetValue((prev) => prev + 1)}>
                +
              </PlusMinusButton>
            </BetControls>
            <BetAmountButtons>
              {[100, 200, 500, 1000].map((amount) => (
                <AmountButton
                  key={amount}
                  onClick={() => handleBetChange(amount)}
                >
                  {amount.toFixed(2)}
                </AmountButton>
              ))}
            </BetAmountButtons>
          </LeftSection>

          {/* Right Side - Bet Button */}
          <RightSection>
            <BetText>BET</BetText>
            <BetAmountText>{betValue.toFixed(2)} INR</BetAmountText>
          </RightSection>
          </BetOneInsideContainer> : <p>Auto</p>}
          
        </BetOneContainer>
      </BetSection>

      <BetSection>
        <BetOneContainer>
          {/* Left Side - Bet Controls */}
          <TabsContainer>
            <ActiveTabIndicator position={activeTabTwo} />
            <Tab active={activeTabTwo === 0} onClick={() => setActiveTabTwo(0)}>
              Bet
            </Tab>
            <Tab active={activeTabTwo === 1} onClick={() => setActiveTabTwo(1)}>
              Auto
            </Tab>
          </TabsContainer>
          {activeTabTwo === 0 ? <BetOneInsideContainer>
          <LeftSection>
            <BetControls>
              <PlusMinusButton
                onClick={() => setBetValue((prev) => Math.max(1, prev - 1))}
              >
                −
              </PlusMinusButton>
              <BetValue>{betValue.toFixed(2)}</BetValue>
              <PlusMinusButton onClick={() => setBetValue((prev) => prev + 1)}>
                +
              </PlusMinusButton>
            </BetControls>
            <BetAmountButtons>
              {[100, 200, 500, 1000].map((amount) => (
                <AmountButton
                  key={amount}
                  onClick={() => handleBetChange(amount)}
                >
                  {amount.toFixed(2)}
                </AmountButton>
              ))}
            </BetAmountButtons>
          </LeftSection>

          {/* Right Side - Bet Button */}
          <RightSection>
            <BetText>BET</BetText>
            <BetAmountText>{betValue.toFixed(2)} INR</BetAmountText>
          </RightSection>
          </BetOneInsideContainer> : <p>Auto</p>}
          
        </BetOneContainer>
      </BetSection>
    </BetPanelContainer>
  );
};

export default BetPlane;
