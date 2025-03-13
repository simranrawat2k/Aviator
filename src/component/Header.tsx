import React from "react";
import styled from "styled-components";
import aviatorLogo from "../assets/aviator-logo.cafbd29233306bf7.svg"
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1B1C1D;
  padding: 8px 10px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: 768px) {
    gap: 6px;
  }
`;

const Logo = styled.img`
  width: 80px;
`;

const HowToPlayButton = styled.button`
  background-color: #E69308;
  color: #5F3D14;
  border: none;
  padding: 2px 8px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  
  &:hover {
    background-color: #e69500;
  }

  svg {

    fill: #714B0E; 
  }

    @media (max-width: 768px) {
    background-color: transparent; 
    padding: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    justify-content: center;

    svg {
      fill: #767B85;  
    }
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px; 
  color: #767b85;
  font-weight: bold;
  font-size: 14px;
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background-color:rgb(68, 69, 72);
`;

const Balance = styled.span`
  color: #24A909;
  font-weight: bold;
  font-size: 18px;
`;

const Header: React.FC = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <HeaderContainer>
      <LeftSection>
        <Logo src={aviatorLogo} alt="Aviator Logo" />
        <HowToPlayButton>
          <HelpOutlineOutlinedIcon style={{ fontSize: "18px" }}/>
          {!isMobile && "How to Play?"}
        </HowToPlayButton>
      </LeftSection>
      <RightSection>
        <BalanceContainer>
          <Balance>0.00</Balance>
          <span>INR</span>
        </BalanceContainer>
        <Separator />
        <MenuIcon style={{ color: "#767B85", fontSize: "28px", cursor: "pointer" }} />
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
