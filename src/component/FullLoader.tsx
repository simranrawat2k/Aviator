import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import moveImage from "../assets/wheel.png";

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: black;
`;

const Propeller = styled(motion.img)`
  width: 150px; 
  height: 150px;

  @media (max-width: 700px) {
   width: 80px; 
   height: 80px;
  }
`;

const LoadingText = styled.p`
  color: white;
  font-size: 34px;
  padding:0px;
  margin:20px;

  @media (max-width: 768px) {
   font-size: 28px;
  }

  @media (max-width: 520px) {
   font-size: 24px;
  }

   @media (max-width: 520px) {
   font-size: 20px;
  }
`;

const LoadingBarContainer = styled.div`
  width: 220px;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.2); 
  overflow: hidden;
  border-radius: 4px;
`;

const LoadingBar = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #e50539;
`;

const FullLoader: React.FC = () => {
  return (
    <LoaderContainer>
      {/* Spinning Propeller */}
      <Propeller
        src={moveImage}
        alt="Loading"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />

      {/* Text Below */}
      <LoadingText>WAITING FOR NEXT ROUND</LoadingText>

      {/* Moving Loading Bar */}
      <LoadingBarContainer>
        <LoadingBar
          animate={{ x: ["100%", "-100%"] }} 
          transition={{ duration: 3, ease: "linear", repeat: Infinity }}
        />
      </LoadingBarContainer>
     
    </LoaderContainer>
  );
};

export default FullLoader;
