// import React, { useState, useEffect } from "react";
// import styled from "styled-components";

// const PointsWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   width: 100%;
//   height: 100%;
// `;

// const PointsText = styled.div<{ endTime: boolean }>`
//   font-size: 95px;
//   line-height: 40px;
//   font-family: "Inter", sans-serif;
//   color: ${({ endTime }) => (endTime ? "#F7001F" : "white")};
//   font-weight: bold;
// `;

// const Message = styled.div`
//   font-size: 40px;
//   font-family: "Inter", sans-serif;
//   color: white;
//   margin-bottom: 30px;
//   font-weight: normal; /* Remove bold */
// `;

// const Points = () => {
//   const [points, setPoints] = useState(1.00);
//   const [endTime, setEndTime] = useState(false);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setPoints((prevPoints) => {
//         if (prevPoints < 10.00) {
//           return Math.min(prevPoints + 0.01, 10.00); // Ensure it doesn't go above 10
//         }
//         return prevPoints;
//       });
//     }, 100);

//     // Stop after 20 seconds
//     const timeout = setTimeout(() => {
//       clearInterval(timer);
//       setEndTime(true); // Set endTime to true after the time ends
//     }, 2000);

//     return () => {
//       clearInterval(timer);
//       clearTimeout(timeout);
//     };
//   }, []);

//   return (
//     <PointsWrapper>
//       {endTime && <Message>FLEW AWAY!</Message>} {/* Display the message when time ends */}
//       <PointsText endTime={endTime}>{points.toFixed(2)}x</PointsText> {/* Format number to 2 decimal places */}
//     </PointsWrapper>
//   );
// };

// export default Points;

import React, { useEffect, useRef, useState } from "react";
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
  gap: 20px;
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
  cursor: pointer;
`;

const RightCashOut = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(182, 123, 13);
  border: 1px solid rgb(176, 176, 176);
  width: 230px;
  padding: 0px 12px;
  height: 87px;
  border-radius: 20px;
  min-width: 100px;
  cursor: pointer;
`;

const BetText = styled.div`
  color: white;
  font-size: 23px;
`;

const CashText = styled.div`
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

const CashoutAmount = styled(Typography)`
  && {
    color: white;
    font-size: 23px;
    margin-top: 4px;
  }
`;

const RightCancel = styled.div`
  background-color: #cb011a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(176, 176, 176);
  width: 230px;
  padding: 0px 12px;
  height: 87px;
  border-radius: 20px;
  min-width: 100px;
  cursor: pointer;
`;

const RightWaiting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CancelText = styled.div`
  color: white;
  font-size: 23px;
`;

const WaitingCancelText = styled.div`
  color: white;
  font-size: 20px;
  background-color: #cb011a;
  width: 200px;
  height: 47px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  cursor: pointer;
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

interface GraphProps {
  roundStart: boolean;
  isPlaneOff: boolean;
}

const BetPlane: React.FC<GraphProps> = ({
  roundStart: loading,
  isPlaneOff,
}) => {
  const [betValues, setBetValues] = useState([10.0, 10.0]);
  const [activeTab, setActiveTab] = useState(0);
  const [isBetPlaced, setIsBetPlaced] = useState([false, false]);
  const [betAfterLoading, setBetAfterLoading] = useState([false, false]);
  const [cashoutValues, setCashoutValues] = useState([10.0, 10.0]);
  const cashoutIntervalRefs = useRef<(NodeJS.Timeout | null)[]>([null, null]);

  const handleBetClick = (index: number) => {
    if (!loading) {
      setBetAfterLoading((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
    } else {
      console.log(`Bet is placed for Bet ${index + 1}:`, betValues[index]);
      setIsBetPlaced((prev) => {
        const updated = [...prev];
        updated[index] = true;
        return updated;
      });
      setCashoutValues((prev) => {
        const updated = [...prev];
        updated[index] = betValues[index];
        return updated;
      });
    }
  };

  const handleCancelClick = (index: number) => {
    console.log(`Remove Bet ${index + 1}`);
    setBetValues((prev) => {
      const updated = [...prev];
      updated[index] = 10.0;
      return updated;
    });
    setIsBetPlaced((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
    setBetAfterLoading((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
    clearInterval(cashoutIntervalRefs.current[index]!);
  };

  const handleCashOutClick = (index: number) => {
    console.log(`Cash Out at Bet ${index + 1}:`, cashoutValues[index].toFixed(2));
    setIsBetPlaced((prev) => {
      const updated = [...prev];
      updated[index] = false;
      return updated;
    });
    clearInterval(cashoutIntervalRefs.current[index]!);
  };

  useEffect(() => {
    if (loading === false && isPlaneOff === false) {
      isBetPlaced.forEach((placed, index) => {
        if (placed) {
          cashoutIntervalRefs.current[index] = setInterval(() => {
            setCashoutValues((prev) => {
              const updated = [...prev];
              updated[index] += 0.01;
              return updated;
            });
          }, 100);
        }
      });
    }
    return () =>
      cashoutIntervalRefs.current.forEach((interval) => {
        if (interval) clearInterval(interval);
      });
    
  }, [loading, isPlaneOff, isBetPlaced]);

  return (
    <BetPanelContainer>
      <TabsContainer>
        <ActiveTabIndicator position={activeTab} />
        <Tab active={activeTab === 0} onClick={() => setActiveTab(0)}>Bet</Tab>
        <Tab active={activeTab === 1} onClick={() => setActiveTab(1)}>Auto</Tab>
      </TabsContainer>
      
      {betValues.map((betValue, index) => (
        <BetSection key={index}>
          <BetOneContainer>
            <BetOneInsideContainer>
              <LeftSection>
                <BetControls>
                  <PlusMinusButton onClick={() => setBetValues((prev) => {
                    const updated = [...prev];
                    updated[index] = Math.max(1, prev[index] - 1);
                    return updated;
                  })}>−</PlusMinusButton>
                  <BetValue>{betValue.toFixed(2)}</BetValue>
                  <PlusMinusButton onClick={() => setBetValues((prev) => {
                    const updated = [...prev];
                    updated[index] = prev[index] + 1;
                    return updated;
                  })}>+</PlusMinusButton>
                </BetControls>
                <BetAmountButtons>
                  {[100, 500, 1000, 5000].map((amount) => (
                    <AmountButton key={amount} onClick={() => setBetValues((prev) => {
                      const updated = [...prev];
                      updated[index] = amount;
                      return updated;
                    })}>{amount}</AmountButton>
                  ))}
                </BetAmountButtons>
              </LeftSection>
              <div onClick={
                betAfterLoading[index] ? () => handleCancelClick(index) :
                isBetPlaced[index] ? (loading === false && isPlaneOff === false ?
                  () => handleCashOutClick(index) :
                  () => handleCancelClick(index)) :
                () => handleBetClick(index)
              }>
                {betAfterLoading[index] ? (
                  <RightWaiting>
                    <p style={{ color: "#A6A2AD" }}>Waiting for next round</p>
                    <WaitingCancelText>CANCEL</WaitingCancelText>
                  </RightWaiting>
                ) : loading === false && isPlaneOff === false && isBetPlaced[index] ? (
                  <RightCashOut>
                    <CashText>CASH OUT</CashText>
                    <CashoutAmount>{cashoutValues[index].toFixed(2)} INR</CashoutAmount>
                  </RightCashOut>
                ) : isBetPlaced[index] ? (
                  <RightCancel>
                    <CancelText>CANCEL</CancelText>
                  </RightCancel>
                ) : (
                  <RightSection>
                    <BetText>BET</BetText>
                    <BetAmountText>{betValue.toFixed(2)} INR</BetAmountText>
                  </RightSection>
                )}
              </div>
            </BetOneInsideContainer>
          </BetOneContainer>
        </BetSection>
      ))}
    </BetPanelContainer>
  );
};




export default BetPlane;
