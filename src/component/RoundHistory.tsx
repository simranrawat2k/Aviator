import React, { useState } from "react";
import styled from "styled-components";
import HistoryIcon from "@mui/icons-material/History";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const RoundHistoryContainer = styled.div`
  height: 18px;
  width: 99%;
  margin-top: 4px;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
`;

const AllHistory = styled.div`
  color: white;
  height: auto;
  width: 99%;
  position: absolute;
  z-index: 10;
  background-color: #1f2128;
  border-radius: 20px;
  top: 0px;
  padding: 10px 0px 10px 15px;
  
  @media (max-width: 670px) and (min-width: 480px) {
    width: 98%;
  }

   @media (max-width: 480px) and (min-width: 360px) {
    width: 97%;
  }

  @media (max-width: 360px) {
    width: 96%;
  }
`;

const HistoryBox = styled.div`
  position: relative;
  width: 99%;
`;

const HistoryButton = styled.div`
  color: #767b85;
  display: flex;
  position: absolute;
  top: 0px;
  right: 0px;
  z-index: 20;
  padding: 2px 7px;
  border-radius: 30px;
  border: 1px solid #767b85;
  cursor: pointer;
  background-color: #252528;
  svg {
    font-size: 14px;
    transition: color 0.3s ease;
  }

  &:hover svg {
    color: red;
  }
`;

const MultiplierWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  max-width: 100%;
`;

const AllItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const MultiplierItem = styled.span<{ value: number }>`
  font-size: 12px;
  color: ${({ value }) =>
    value > 10 ? "#681462" : value > 1 ? "#853AE2" : "#2D93CF"};
  font-weight: bold;
  background-color: rgb(0, 0, 0);
  padding: 0px 7px 2px 7px;
  border-radius: 30px;
`;

const RoundHistory: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  function handleShow() {
    setShowAll((prev) => !prev);
  }

  const multipliers: string[] = [
    "1.00",
    "2.34",
    "3.45",
    "4.56",
    "5.67",
    "11.23",
    "1.00",
    "0.89",
    "1.00",
    "2.34",
    "3.45",
    "4.56",
    "5.67",
    "11.23",
    "1.00",
    "0.89",
    "1.00",
    "2.34",
    "3.45",
    "4.56",
    "5.67",
    "11.23",
    "1.00",
    "0.89",
    "1.00",
    "2.34",
    "3.45",
    "4.56",
    "5.67",
    "11.23",
  ];

  return (
    <HistoryBox>
      {showAll ? (
        <AllHistory>
          <div>Round History</div>
          <AllItem>
            {multipliers.map((multiplier, index) => {
              const value = parseFloat(multiplier);
              return (
                <MultiplierItem key={index} value={value}>
                  {multiplier}x
                </MultiplierItem>
              );
            })}
          </AllItem>
        </AllHistory>
      ) : (
        <RoundHistoryContainer>
          <MultiplierWrapper>
            {multipliers.map((multiplier, index) => {
              const value = parseFloat(multiplier);
              return (
                <MultiplierItem key={index} value={value}>
                  {multiplier}x
                </MultiplierItem>
              );
            })}
          </MultiplierWrapper>
        </RoundHistoryContainer>
      )}

      <HistoryButton onClick={handleShow}>
        <HistoryIcon />
        {showAll ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </HistoryButton>
    </HistoryBox>
  );
};

export default RoundHistory;
