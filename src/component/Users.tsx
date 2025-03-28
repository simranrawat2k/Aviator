import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useGameContext } from "../context/GameContext";
import HistoryIcon from "@mui/icons-material/History";
import pic1 from "../assets/profile.avif";

const TabsContainer = styled.div`
  display: flex;
  width: 260px;
  background: #101011;
  border: 1px solid #2c2d30;
  border-radius: 28px;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
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

const ContentContainer = styled.div`
  width: 98%;
  margin-top: 20px;
  padding: 10px;
  margin: 10px;
  background: #1b1c1d;
  color: #ffffff;
  border-radius: 10px;
  text-align: center;
  overflow: auto;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1000px) {
    width: 94%;
  }

  @media (max-width: 500px) {
    width: 91%;
  }
`;

const AllUser = styled.div`
  padding-inline: 10px;

  @media (max-width: 500px) {
    padding-inline: 0px;
  }
`;

const TotalBetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserNumber = styled.div`
  color: white;
  @media (max-width: 1100px) and (min-width: 1000px) {
    font-size: 14px;
  }
`;

const PreviousBets = styled.div`
  color: #808080;
  font-size: 12px;
  border: 1px solid #808080;
  border-radius: 20px;
  padding: 5px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;

  @media (max-width: 1100px) and (min-width: 1000px) {
    font-size: 10px;
  }
`;

const SubHeading = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7b7b7b;
  margin-top: 20px;
  font-size: 12px;
  margin-bottom: 10px;
`;

const UserColumn = styled.div`
  padding: 6px 2px;
  background-color: #0b0e0f;
  border-radius: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
   font-size: 14px;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const UserGreenColumn = styled.div`
  padding: 4px 2px;
  background-color: rgb(16, 85, 0);
  border: 1px solid #808080;
  border-radius: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
   font-size: 14px;
  @media (max-width: 500px) {
    font-size: 12px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  width: 25%;
  justify-content: start;
  align-items: center;
  text-align: initial;
  padding-left: 5px;
  height: 26px;
  gap: 5px;
  font-size: 14px;

  @media (max-width: 1300px) and (min-width: 1000px) {
    font-size: 12px;
  }
`;
const UserMoney = styled.div`
  border: 1px solid #808080;
  border-radius: 20px;
  width: 30%;
  text-align: center;

  @media (max-width: 1300px) and (min-width: 1000px) {
    font-size: 12px;
  }
`;

const UserGreenMoney = styled.div`
  border-radius: 20px;
  width: 30%;
  text-align: center;

  @media (max-width: 1300px) and (min-width: 1000px) {
    font-size: 12px;
  }
`;

const UserMult = styled.div`
  width: 20%;
  text-align: -webkit-center;
`;

const UserCash = styled.div`
  width: 25%;
  text-align: end;
  padding-right: 20px;

  @media (max-width: 1300px) and (min-width: 1000px) {
    padding-right: 5px;
    font-size: 12px;
  }
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;

const Points = styled.div`
  border-radius: 20px;
  padding: 3px 10px;
  background-color: #091a02;
  color: #2c96ce;
  font-size: 14px;
  font-weight: bold;
  width: fit-content;
   font-size: 12px;

  @media (max-width: 1300px) and (min-width: 1000px) {
    padding: 3px 4px;
  }
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
          <AllUser>
            <TotalBetHeader>
              <UserNumber>
                TOTAL BETS : <span style={{ color: "#28A909" }}>65</span>
              </UserNumber>
              <PreviousBets>
                {" "}
                <HistoryIcon style={{ fontSize: "18px" }} />
                Previous Hand
              </PreviousBets>
            </TotalBetHeader>
            <SubHeading>
              <div style={{ width: "25%", textAlign: "initial" }}>User</div>
              <div style={{ width: "30%", textAlign: "center" }}>Bet</div>
              <div style={{ width: "20%", textAlign: "center" }}>Mult.</div>
              <div style={{ width: "25%", textAlign: "end" }}>Cash Out</div>
            </SubHeading>

            <UserGreenColumn>
              <UserInfo>
                <Image src={pic1} alt="Bet Icon" />
                <p>i***h</p>
              </UserInfo>
              <UserGreenMoney>850.00 &#8377;</UserGreenMoney>
              <UserMult>
                <Points>1.26x</Points>
              </UserMult>
              <UserCash>890.00 &#8377;</UserCash>
            </UserGreenColumn>

            <UserColumn>
              <UserInfo>
                <Image src={pic1} alt="Bet Icon" />
                <p>H***3</p>
              </UserInfo>
              <UserMoney>1,200.00 &#8377;</UserMoney>
              <UserMult>-</UserMult>
              <UserCash>-</UserCash>
            </UserColumn>

            <UserGreenColumn>
              <UserInfo>
                <Image src={pic1} alt="Bet Icon" />
                <p>K***8</p>
              </UserInfo>
              <UserGreenMoney>200.00 &#8377;</UserGreenMoney>
              <UserMult>
                <Points style={{ color: "#944cf1" }}>2.60x</Points>
              </UserMult>
              <UserCash>256.00 &#8377;</UserCash>
            </UserGreenColumn>
          </AllUser>
        ) : (
          <>
            <p>My Bets Content</p>
            <p>
              <strong>Game Status:</strong> {gameState.status}
            </p>
            <p>
              <strong>Multiplier:</strong> {gameState.multiplier}
            </p>
            <p>
              <strong>Round Start:</strong>{" "}
              {gameState.roundStart ? "Yes" : "No"}
            </p>
            <p>
              <strong>Is Plane Off:</strong>{" "}
              {gameState.isPlaneOff ? "Yes" : "No"}
            </p>
          </>
        )}
      </ContentContainer>
    </>
  );
}
