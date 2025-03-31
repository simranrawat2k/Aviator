import React, { useEffect, useState } from "react";
import styled from "styled-components";
import aviatorLogo from "../assets/aviator-logo.cafbd29233306bf7.svg";
import MenuIcon from "@mui/icons-material/Menu";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useBalance } from "../context/BalanceContext";
import { useUI } from "../context/uiContext";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Switch } from "@mui/material";
import HowToPlay from "./HowToPlay";
import { useUser } from "../context/UserContext";

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1b1c1d;
  padding: 0px 10px;
  height: 50px;
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

  @media (max-width: 450px) {
    width: 72px;
  }

  @media (max-width: 350px) {
    width: 50px;
  }
`;

const HowToPlayButton = styled.button`
  background-color: #e69308;
  color: #5f3d14;
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
    fill: #714b0e;
  }

  @media (max-width: 768px) {
    background-color: transparent;
    padding: 8px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    justify-content: center;

    svg {
      fill: #767b85;
    }
  }

  @media (max-width: 450px) {
    padding: 5px 0px 0px 0px;
    width: 20px;
    height: 20px;
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 450px) {
    gap: 5px;
  }
`;

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #767b85;
  font-weight: bold;
  font-size: 14px;

  @media (max-width: 350px) {
    font-size: 12px;
  }
`;

const Separator = styled.div`
  width: 1px;
  height: 24px;
  background-color: rgb(68, 69, 72);
`;

const BalanceBox = styled.span`
  color: #24a909;
  font-weight: bold;
  font-size: 18px;
  margin-left: 20px;

  @media (max-width: 450px) {
    font-size: 16px;
    margin-left: 5px;
  }

  @media (max-width: 350px) {
    font-size: 12px;
    margin-left: 2px;
  }
`;

const StyledMenuIcon = styled(MenuIcon)`
  color: #767b85;
  font-size: 28px;
  cursor: pointer;

  @media (max-width: 450px) {
    font-size: 22px;
  }
`;

const CustomSwitch = styled(Switch)({
  
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "white", // Moving dot color when ON
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "rgb(47, 254, 0)", // Background when ON
    border: "2px solid white",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "black", // Background when OFF
    border: "2px solid white",
    borderRadius: "20px",
  },
  "& .MuiSwitch-thumb": {
    marginTop: 1, // Adjust to center it properly
  },
 
});

const Header: React.FC<{ toggleAudio: () => void; isPlaying: boolean }> = ({ toggleAudio, isPlaying }) => {
  const { user } = useUser();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { amount } = useBalance();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

 

  const [isHowToPlayOpen, setIsHowToPlayOpen] = useState<boolean>(false);

  const handleModalOpen = () => setIsHowToPlayOpen(true);
  const handleModalClose = () => setIsHowToPlayOpen(false);


  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log("Fetched user data:", user);

  return (
    <HeaderContainer>
      <LeftSection>
        <Logo src={aviatorLogo} alt="Aviator Logo" />
        <HowToPlayButton onClick={handleModalOpen}>
          <HelpOutlineOutlinedIcon style={{ fontSize: "18px" }} />
          {!isMobile && "How to Play?"}
        </HowToPlayButton>
        <HowToPlay isOpen={isHowToPlayOpen} handleModalClose={handleModalClose} />
      </LeftSection>
      <RightSection>
        <BalanceContainer>
          <span>{user?.UserName || "Guest"}</span>
          <BalanceBox>{amount.toFixed(2)}</BalanceBox>
          <span>INR</span>
        </BalanceContainer>
        <Separator />

        <div>
          <span
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            style={{ cursor: "pointer" }} // Ensures it's clickable
          >
            <StyledMenuIcon />
          </span>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            sx={{
              "& .MuiPaper-root": {
                backgroundColor: "#2C2D30", 
                minWidth: "200px",
                paddingTop:"0px",
                paddingBottom:"0px"
              },
            }}
          >
            <MenuItem
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "12px",
                fontWeight: "bold",
                color: "#AEAEAF",
                // borderBottom: "1px solid rgb(83, 83, 83)",
              }}
            >
              SOUND
              <CustomSwitch size="small" checked={isPlaying} onChange={toggleAudio} />
            </MenuItem>
          </Menu>
        </div>
      </RightSection>
    </HeaderContainer>
  );
};

export default Header;
