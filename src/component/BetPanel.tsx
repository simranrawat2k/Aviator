import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBalance } from "../context/BalanceContext";

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
  const [bets, setBets] = useState([
    {
      betValue: 10.0,
      isBetPlaced: false,
      betAfterLoading: false,
      cashoutValue: 10.0,
    },
    {
      betValue: 10.0,
      isBetPlaced: false,
      betAfterLoading: false,
      cashoutValue: 10.0,
    },
  ]);
  const cashoutIntervals = useRef<(NodeJS.Timeout | null)[]>([null, null]);
  const [activeTab, setActiveTab] = useState(0);
  const { addToBalance } = useBalance();

  const handleBetClick = (index: number) => {
    setBets((prev) =>
      prev.map((bet, i) =>
        i === index
          ? !loading
            ? { ...bet, betAfterLoading: true } // Mark for the next round
            : { ...bet, isBetPlaced: true, cashoutValue: bet.betValue }
          : bet
      )
    );
  
    // Save to localStorage if waiting for the next round
    if (!loading) {
      localStorage.setItem(
        `prevBet${index + 1}`,
        JSON.stringify({ isPrevBet: true, betAmount: bets[index].betValue })
      );
    }
  };
  


  useEffect(() => {
    if (loading) {
      const prevBet1 = JSON.parse(localStorage.getItem("prevBet1") || "null");
      const prevBet2 = JSON.parse(localStorage.getItem("prevBet2") || "null");
  
      setBets([
        {
          betValue: prevBet1?.isPrevBet ? prevBet1.betAmount : 10.0,
          isBetPlaced: prevBet1?.isPrevBet ? true : false,
          betAfterLoading: false,
          cashoutValue: prevBet1?.isPrevBet ? prevBet1.betAmount : 10.0,
        },
        {
          betValue: prevBet2?.isPrevBet ? prevBet2.betAmount : 10.0,
          isBetPlaced: prevBet2?.isPrevBet ? true : false,
          betAfterLoading: false,
          cashoutValue: prevBet2?.isPrevBet ? prevBet2.betAmount : 10.0,
        },
      ]);
  
      // Remove the stored bets after they are used
      if (prevBet1?.isPrevBet) localStorage.removeItem("prevBet1");
      if (prevBet2?.isPrevBet) localStorage.removeItem("prevBet2");
    }
  }, [loading]);
  
  

  const handleCancelClick = (index: number) => {
    clearInterval(cashoutIntervals.current[index]!);
    setBets((prev) =>
      prev.map((bet, i) =>
        i === index
          ? {
              ...bet,
              betValue: 10.0,
              isBetPlaced: false,
              betAfterLoading: false,
            }
          : bet
      )
    );
  };

  const handleCashOutClick = (index: number) => {
    const amountWon = bets[index].cashoutValue;
    toast.success(`You won ${amountWon.toFixed(2)} INR 🎉`);

    addToBalance(amountWon); // Update balance in context

    clearInterval(cashoutIntervals.current[index]!);
    setBets((prev) =>
      prev.map((bet, i) => (i === index ? { ...bet, isBetPlaced: false } : bet))
    );
  };
  
  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        // Clear previous intervals before starting new ones
        cashoutIntervals.current.forEach((interval) => clearInterval(interval!));
        cashoutIntervals.current = [];
  
        bets.forEach((bet, index) => {
          if (!isPlaneOff && bet.isBetPlaced) {
            const interval = setInterval(() => {
              setBets((prev) =>
                prev.map((b, i) =>
                  i === index ? { ...b, cashoutValue: b.cashoutValue + 0.01 } : b
                )
              );
            }, 100);
  
            // Store interval reference
            cashoutIntervals.current[index] = interval;
          }
        });
      }, 1000); // 1-second delay before starting intervals
    }
  
    return () => {
      // Cleanup function only when the component unmounts
      cashoutIntervals.current.forEach((interval) => clearInterval(interval!));
      cashoutIntervals.current = [];
    };
  }, [loading, isPlaneOff]); // Removed 'bets' from dependencies
  
  
  

  useEffect(() => {
    if (isPlaneOff) {
      cashoutIntervals.current.forEach((interval) => clearInterval(interval!));
      setBets((prev) =>
        prev.map((bet, index) => {
          if (bet.isBetPlaced) {
            // toast.error(`Bet ${index + 1} Lost ❌`);
          }
          return { ...bet, isBetPlaced: false, betAfterLoading: false }; // Reset the bet state
        })
      );
    }
  }, [isPlaneOff]);

  useEffect(() => {
    if (!loading) {
      setBets((prevBets) =>
        prevBets.map((bet) => {
          if (bet.betAfterLoading) {
            console.log(`Automatically placing bet of ${bet.betValue} INR`);
            return {
              ...bet,
              isBetPlaced: true,
              betAfterLoading: false,
              cashoutValue: bet.betValue,
            };
          }
          return bet;
        })
      );
    }
  }, [loading]);

  return (
    <BetPanelContainer>
      {bets.map((bet, index) => (
        <BetSection key={index}>
          <BetOneContainer>
            <TabsContainer>
              <ActiveTabIndicator position={activeTab} />
              <Tab active={activeTab === 0} onClick={() => setActiveTab(0)}>
                Bet
              </Tab>
              <Tab active={activeTab === 1} onClick={() => setActiveTab(1)}>
                Auto
              </Tab>
            </TabsContainer>
            <BetOneInsideContainer>
              <LeftSection>
                <BetControls>
                  <PlusMinusButton
                    onClick={() =>
                      setBets((prev) =>
                        prev.map((b, i) =>
                          i === index
                            ? { ...b, betValue: Math.max(1, b.betValue - 1) }
                            : b
                        )
                      )
                    }
                  >
                    −
                  </PlusMinusButton>
                  <BetValue>{bet.betValue.toFixed(2)}</BetValue>
                  <PlusMinusButton
                    onClick={() =>
                      setBets((prev) =>
                        prev.map((b, i) =>
                          i === index ? { ...b, betValue: b.betValue + 1 } : b
                        )
                      )
                    }
                  >
                    +
                  </PlusMinusButton>
                </BetControls>
                <BetAmountButtons>
                  {[100, 500, 1000, 5000].map((amount) => (
                    <AmountButton
                      key={amount}
                      onClick={() =>
                        setBets((prev) =>
                          prev.map((b, i) =>
                            i === index ? { ...b, betValue: amount } : b
                          )
                        )
                      }
                    >
                      {amount}
                    </AmountButton>
                  ))}
                </BetAmountButtons>
              </LeftSection>

              <div
                onClick={
                  bet.betAfterLoading
                    ? () => handleCancelClick(index)
                    : bet.isBetPlaced
                    ? loading === false && isPlaneOff === false
                      ? () => handleCashOutClick(index)
                      : () => handleCancelClick(index)
                    : () => handleBetClick(index)
                }
              >
                {bet.betAfterLoading ? (
                  <RightWaiting>
                    <p style={{ color: "#A6A2AD" }}>Waiting for next round</p>
                    <WaitingCancelText>CANCEL</WaitingCancelText>
                  </RightWaiting>
                ) : loading === false &&
                  isPlaneOff === false &&
                  bet.isBetPlaced ? (
                  <RightCashOut>
                    <CashText>CASH OUT</CashText>
                    <CashoutAmount>
                      {bet.cashoutValue.toFixed(2)} INR
                    </CashoutAmount>
                  </RightCashOut>
                ) : bet.isBetPlaced && !isPlaneOff ? (
                  <RightCancel>
                    <CancelText>CANCEL</CancelText>
                  </RightCancel>
                ) : (
                  <RightSection>
                    <BetText>BET</BetText>
                    <BetAmountText>{bet.betValue.toFixed(2)} INR</BetAmountText>
                  </RightSection>
                )}
              </div>
            </BetOneInsideContainer>
          </BetOneContainer>
        </BetSection>
      ))}
      <ToastContainer position="top-right" autoClose={3000} />
    </BetPanelContainer>
  );
};

export default BetPlane;
