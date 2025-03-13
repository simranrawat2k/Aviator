import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";

const BetPanelContainer = styled(Box)`
  display: flex;
  height: 100%;
  background-color: #101011;
  
  gap: 8px;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

// Bet Section Style
const BetSection = styled(Box)`
  flex: 1;
 
  
  margin: 4px;
  text-align: center;
  color: white;

  @media (max-width: 700px) {
    width: 100%;
  }
`;

// Bet One Specific Styling
const BetOneContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1B1C1D;
  border: 2px solid #2C2D30;
  padding: 16px;
  border-radius: 12px;
  width: 95%;
`;

const LeftSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const BetControls = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #101011;
  border: 2px solid #2C2D30;
  padding: 2px 8px;
  border-radius: 36px;
`;

const BetButton = styled(Button).attrs({ disableRipple: true })`
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




const BetValue = styled(Typography)`
  text-align: center;
  font-size: 40px;
  font-weight: 900;
  color: white;
`;

const BetAmountButtons = styled(Box)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
`;

const AmountButton = styled(Button)`
  background-color:rgb(255, 0, 0);
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 8px;
  border-radius: 6px;
  &:hover {
    background-color: #454545;
  }
`;

const RightSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #28a745;
  padding: 12px;
  border-radius: 8px;
  min-width: 100px;
`;

const BetText = styled(Typography)`
  color: white;
  font-size: 18px;
  font-weight: bold;
`;

const BetAmountText = styled(Typography)`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-top: 4px;
`;

const BetPlane: React.FC = () => {
  const [betValue, setBetValue] = useState(10.0);

  const handleBetChange = (amount: number) => {
    setBetValue(amount);
  };

  return (
    <BetPanelContainer>
      {/* Bet One */}
      <BetSection>
        <BetOneContainer>
          {/* Left Side - Bet Controls */}
          <LeftSection>
            <BetControls>
              <BetButton onClick={() => setBetValue((prev) => Math.max(1, prev - 1))}>−</BetButton>
              <BetValue>{betValue.toFixed(2)}</BetValue>
              <BetButton onClick={() => setBetValue((prev) => prev + 1)}>+</BetButton>
            </BetControls>
            <BetAmountButtons>
              {[100, 200, 500, 1000].map((amount) => (
                <AmountButton key={amount} onClick={() => handleBetChange(amount)}>
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
        </BetOneContainer>
      </BetSection>

      {/* Bet Two */}
      <BetSection><BetSection>
        <BetOneContainer>
          {/* Left Side - Bet Controls */}
          <LeftSection>
            <BetControls>
              <BetButton onClick={() => setBetValue((prev) => Math.max(1, prev - 1))}>−</BetButton>
              <BetValue>{betValue.toFixed(2)}</BetValue>
              <BetButton onClick={() => setBetValue((prev) => prev + 1)}>+</BetButton>
            </BetControls>
            <BetAmountButtons>
              {[100, 200, 500, 1000].map((amount) => (
                <AmountButton key={amount} onClick={() => handleBetChange(amount)}>
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
        </BetOneContainer>
      </BetSection></BetSection>
    </BetPanelContainer>
  );
};

export default BetPlane;
