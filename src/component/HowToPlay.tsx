import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import bet1 from "../assets/01-bet.svg"
import bet2 from "../assets/02-bet.svg"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  height: "80vh",
  bgcolor: "#383A3E",
  borderRadius: "8px",
  boxShadow: 24,
  color: "white",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden", 
  paddingBottom: "10px",

   "@media (max-width: 760px)": {
    width: "90%",
  },
};

const HowToPlayTitle = styled.div`
  background-color: #2c2d30;
  padding: 16px;
  font-size: 18px;
  font-weight: bold;
`;

const CloseButton = styled.div`
  color: white;
  position: absolute;
  top: 18px;
  right: 18px;
  cursor: pointer;
`;

const ContentDiv = styled.div`
  flex-grow: 1;
  overflow-y: auto; 
  overflow-x: hidden; 
  padding: 16px;
  font-size: 16px;

  /* Hide scrollbar for Firefox */
  scrollbar-width: none;

  /* Hide scrollbar for WebKit browsers (Chrome, Safari) */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Points = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  margin-top: 20px;
  padding-inline: 10px;
`;

const Num = styled.div`
  font-weight: 700;
  font-size: 24px;
`;

const Image = styled.img`
  width: 40px; 
  height: auto;
`;

interface HowToPlayProps {
  isOpen: boolean;
  handleModalClose: () => void;
}

const HowToPlay: React.FC<HowToPlayProps> = ({ isOpen, handleModalClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleModalClose}
      aria-labelledby="how-to-play-title"
    >
      <Box sx={style}>
        <HowToPlayTitle>How to Play?</HowToPlayTitle>

        <ContentDiv>
          <iframe
            width="100%"
            height="600" 
            src="https://www.youtube.com/embed/PZejs3XDCSY?si=8Ry-T8WSWNHP-f3O"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <Points>
            <Num>01</Num>
            <Image src={bet1} alt="Bet Icon" />
            <div>Make a bet, or even two at same time and wait for the round to start.</div>
          </Points>

          <Points>
            <Num>02</Num>
            <Image src={bet2} alt="Bet Icon" />
            <div>Look after the lucky plane. Your win is bet multiplied be a coefficient of lucky plane.</div>
          </Points>

          <Points>
            <Num>03</Num>
            <Image src={bet1} alt="Bet Icon" />
            <div>Cash Out before plane files away and money is yours!</div>
          </Points>
        </ContentDiv>

        <CloseButton onClick={handleModalClose}>X</CloseButton>
      </Box>
    </Modal>
  );
};

export default HowToPlay;
