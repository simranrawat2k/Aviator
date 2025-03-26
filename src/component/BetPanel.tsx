import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBalance } from "../context/BalanceContext";
import { useGameContext } from "../context/GameContext";
import UserData from "../Json/UserData.json";
import { useUI } from "../context/uiContext";

const BetPanelContainer = styled(Box)`
  display: flex;
  height: 100%;
  background-color: #101011;
  gap: 2px;
  @media (max-width: 700px) {
    flex-direction: column;
    gap: 20px;
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
  width: 100%;
`;

const LeftSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 0px;
  width: 30%;
  margin-right: 40px;

  @media (max-width: 720px) {
    width: 45%;
    gap: 10px;
  }
`;

const BetControls = styled(Box)`
  display: flex;
  align-items: center;
  background-color: #101011;
  border: 2px solid #2c2d30;
  padding: 0px 8px;
  border-radius: 36px;
  justify-content: center;

  @media (max-width: 720px) {
    gap: 7px;
  }
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

  @media (max-width: 720px) {
    && {
      margin: 6px 2px;
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

  @media (max-width: 720px) {
    && {
      font-size: 16px;
    }
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
  width: 100%;
  padding: 0px 25px;
  height: 87px;
  border-radius: 20px;
  min-width: 100px;
  cursor: pointer;

  @media (min-width: 1000px) and (max-width: 1300px) {
    width: 60%;
  }

  @media (max-width: 720px) {
    width: 100px;
  }
`;

const RightCashOut = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(182, 123, 13);
  border: 1px solid rgb(176, 176, 176);
  width: 100%;
  padding: 0px 20px;
  height: 87px;
  border-radius: 20px;
  min-width: 100px;
  cursor: pointer;

  @media (min-width: 1000px) and (max-width: 1300px) {
    width: 60%;
  }

  @media (max-width: 720px) {
    width: 100px;
  }
`;

const BetText = styled.div`
  color: white;
  font-size: 23px;

  @media (max-width: 720px) {
    font-size: 18px;
  }
`;

const CashText = styled.div`
  color: white;
  font-size: 23px;
`;

const BetAmountText = styled.div`
  color: white;
  font-size: 23px;
  margin-top: 4px;
  @media (max-width: 720px) {
    font-size: 16px;
  }
`;

const CashoutAmount = styled.div`
  color: white;
  font-size: 23px;
  margin-top: 4px;

  @media (max-width: 720px) {
    font-size: 16px;
  }
`;

const RightCancel = styled.div`
  background-color: #cb011a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgb(176, 176, 176);
  width: 100%;
  padding: 0px 20px;
  height: 87px;
  border-radius: 20px;
  min-width: 100px;
  cursor: pointer;

  @media (min-width: 1000px) and (max-width: 1300px) {
    width: 60%;
  }

  @media (max-width: 720px) {
    width: 100px;
  }
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
type Cashout = {
  cashOutAmount: number;
};

const BetPlane: React.FC = () => {
  const { gameState } = useGameContext();
  const { status, roundStart, isPlaneOff, multiplier, roundId } = gameState;
  // const { balance, addToBalance } = useBalance();
  const { userData } = useUI(); // Get user data from UIContext
  const userName = userData?.UserName || "Guest"; // Default to "Guest" if no username
  const [activeTab, setActiveTab] = useState(0);
  const { amount, updateAmount} = useBalance();

  const [bets, setBets] = useState([
    {
      betValue: 10.0,
      isBetPlaced: false,
      betAfterLoading: false,
      cashoutValue: 10.0,
      hasCashedOut: false,
    },
    {
      betValue: 10.0,
      isBetPlaced: false,
      betAfterLoading: false,
      cashoutValue: 10.0,
      hasCashedOut: false,
    },
  ]);

  const [cashoutsState, setCashoutsState] = useState<Cashout[]>([]);

  const handleBetClick = (index: number) => {
    const betAmount = bets[index].betValue;

     // Check if the amount is enough
     if (amount <= 0 || amount < betAmount) {
      toast.error("Not Enough Balance"); // Show toast message
      return; // Stop execution
    }

    setBets((prev) =>
      prev.map((bet, i) =>
        i === index
          ? !roundStart
            ? { ...bet, betAfterLoading: true }
            : { ...bet, isBetPlaced: true, cashoutValue: bet.betValue }
          : bet
      )
    );

    if (!roundStart) {
      localStorage.setItem(
        `prevBet${index + 1}`,
        JSON.stringify({ isPrevBet: true, betAmount: betAmount })
      );
    }

    //  **Deduct balance immediately when placing a bet**
    updateAmount(-betAmount);
  };

  useEffect(() => {
    if (roundStart) {
      const prevBet1 = JSON.parse(localStorage.getItem("prevBet1") || "null");
      const prevBet2 = JSON.parse(localStorage.getItem("prevBet2") || "null");

      setBets([
        {
          betValue: prevBet1?.isPrevBet ? prevBet1.betAmount : 10.0,
          isBetPlaced: prevBet1?.isPrevBet ? true : false,
          betAfterLoading: false,
          cashoutValue: prevBet1?.isPrevBet ? prevBet1.betAmount : 10.0,
          hasCashedOut: false,
        },
        {
          betValue: prevBet2?.isPrevBet ? prevBet2.betAmount : 10.0,
          isBetPlaced: prevBet2?.isPrevBet ? true : false,
          betAfterLoading: false,
          cashoutValue: prevBet2?.isPrevBet ? prevBet2.betAmount : 10.0,
          hasCashedOut: false,
        },
      ]);

      if (prevBet1?.isPrevBet) localStorage.removeItem("prevBet1");
      if (prevBet2?.isPrevBet) localStorage.removeItem("prevBet2");
    }
  }, [roundStart]);

  // Function to cancel a bet and return balance
  const handleCancelClick = (index: number) => {
    if (!bets[index]) return;
    updateAmount(bets[index].betValue); // Return bet amount

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

  useEffect(() => {
    const savedBets = JSON.parse(localStorage.getItem("bets") || "null");

    if (savedBets) {
      setBets(savedBets.filter((bet: any) => bet.isBetPlaced)); // Only restore placed bets
    }
  }, []);

  const handleCashOutClick = (index: number) => {
    const bet = bets[index]; // Get the bet that was cashed out
    const amountWon = bet.cashoutValue; // Cashout amount
    const betValue = bet.betValue; // Original bet amount

    // Show success toast
    toast.success(`You won ${amountWon.toFixed(2)} INR 🎉`);

    // Add winnings to balance
    updateAmount(amountWon);

    // Update bet state to mark as cashed out
    setBets((prev) =>
      prev.map((b, i) =>
        i === index ? { ...b, isBetPlaced: false, hasCashedOut: true } : b
      )
    );

    // Determine the correct bet key (betValue1, betValue2)
    const betKey = `betValue${index + 1}`;
    const cashoutKey = `cashOutAmount${index + 1}`;

    // Prepare the JSON payload
    const cashoutData = {
        roundId,
        userName: userName,
        [betKey]: betValue, // Only include the bet that is being cashed out
        [cashoutKey]: amountWon, // Dynamic cashout key
    };

    console.log("Cashout JSON:", JSON.stringify(cashoutData));

    // Send the cashout data to the backend
    fetch("http://localhost:8000/api/cashout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cashoutData),
    })
    .then((res) => res.json())
    .then((data) => console.log("API Response:", data))
    .catch((err) => console.error("API Error:", err));
};




  //  Capture bets at status 3 and initialize cashouts with 0
  useEffect(() => {
    if (status === 3) {
        const placedBets = bets
            .map((bet, index) => ({
                originalIndex: index + 1, // Store 1-based index
                cashOutAmount: 0,
                betValue: bet.isBetPlaced ? bet.betValue : null, // Store betValue only if placed
            }))
            .filter((bet) => bet.betValue !== null); // Remove unplaced bets

        if (placedBets.length > 0) {
            const betValues = placedBets.reduce<Record<string, number>>(
                (acc, bet) => {
                    acc[`betValue${bet.originalIndex}`] = bet.betValue ?? 0; // Maintain original index
                    return acc;
                },
                {}
            );



        //      // Calculate TotalBetValue only when there are 2 or more bets
        //      const totalBetValue = placedBets.length > 1 
        //      ? placedBets.reduce((sum, bet) => sum + (bet.betValue ?? 0), 0) 
        //      : undefined;

        //  const betData = {
        //      roundId,
        //      userName: UserName,
        //      ...betValues,
        //      ...(totalBetValue !== undefined && { TotalBetValue: totalBetValue }) // Add only if 2+ bets
        //  };



            // Calculate TotalBetValue (sum of all bet values)
            const TotalBetValue = placedBets.reduce((sum, bet) => sum + (bet.betValue ?? 0), 0);

            const betData = {
                roundId,
                userName: userName,
                ...betValues,
                TotalBetValue, // Add total bet value
            };

            console.log("Bet Data:", JSON.stringify(betData));

            // Send data to backend
            fetch("http://localhost:8000/api/bets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(betData),
            })
            .then((res) => res.json())
            .then((data) => console.log("API Response:", data))
            .catch((err) => console.error("API Error:", err));

            setCashoutsState(placedBets.map(() => ({ cashOutAmount: 0 }))); // Update state
        }
    }
}, [status]);


  //  Update cashouts dynamically during gameplay
  useEffect(() => {
    setCashoutsState((prevCashouts) =>
      prevCashouts.map((cashout, index) => ({
        cashOutAmount: bets[index]?.cashoutValue ?? cashout.cashOutAmount, // Keep updating live cashout values
      }))
    );
  }, [bets]);

  useEffect(() => {
    if (status === 3 && !isPlaneOff) {
      setBets((prev) => {
        const updatedBets = prev.map((bet) =>
          bet.isBetPlaced
            ? {
                ...bet,
                cashoutValue: parseFloat(
                  (
                    bet.betValue +
                    (bet.betValue * (multiplier - 1)) / 10
                  ).toFixed(2)
                ),
              }
            : bet
        );

        // Save bets to localStorage
        localStorage.setItem("bets", JSON.stringify(updatedBets));

        return updatedBets;
      });
    }
  }, [status, multiplier, isPlaneOff]);

  useEffect(() => {
    if (isPlaneOff) {
      const validBets = bets.filter((bet) => bet.isBetPlaced); // Get only placed bets
  
      if (validBets.length === 0) return; // No bets placed, no JSON should log
  
      validBets.forEach((bet, index) => {
        if (!bet.hasCashedOut) {
          // Only log for non-cashed-out bets
          const betIndex = bets.indexOf(bet) + 1; // Get actual bet position
          const betKey = `betValue${betIndex}`; // Ensure correct bet key
          const cashoutKey = `cashOutAmount${betIndex}`; // Dynamic cashout key
  
          const cashoutData = {
            roundId,
            userName: userName,
            [betKey]: bet.betValue, // Include correct betValue key
            [cashoutKey]: 0, // Correct key mapping
          };
  
          console.log(JSON.stringify(cashoutData));
  
          // 🔴 Send API request to /api/cashout
          fetch("http://localhost:8000/api/cashout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cashoutData),
          })
            .then((res) => res.json())
            .then((data) => console.log("Cashout API Response:", data))
            .catch((err) => console.error("API Error:", err));
        }
      });
  
      // Reset cashouts state
      setCashoutsState((prevCashouts) =>
        prevCashouts.map((cashout, index) => ({
          cashOutAmount: bets[index]?.hasCashedOut ? cashout.cashOutAmount : 0,
        }))
      );
  
      // Reset bets when the plane is off
      setBets((prev) =>
        prev.map((bet) => ({
          ...bet,
          isBetPlaced: false,
          betAfterLoading: false,
          cashoutValue: bet.betValue, // Reset to default bet value
          hasCashedOut: false, // Reset hasCashedOut
        }))
      );
  
      // Clear localStorage
      localStorage.removeItem("bets");
    }
  }, [isPlaneOff]);
  

  useEffect(() => {
    if (!roundStart) {
      setBets((prevBets) =>
        prevBets.map((bet) =>
          bet.betAfterLoading
            ? {
                ...bet,
                isBetPlaced: true,
                betAfterLoading: false,
                cashoutValue: bet.betValue,
              }
            : bet
        )
      );
    }
  }, [roundStart]);

  return (
    <BetPanelContainer>
      {bets.map((bet, index) => (
        <BetSection key={`betPanel ${index}`}>
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
                    ? status === 3 && !isPlaneOff
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
                ) : status === 3 && !isPlaneOff && bet.isBetPlaced ? (
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
