import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import moveImage from "../assets/move.png"; 

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  height: 100vh;
  width: 100vw;
  background-color: #1b1c1d;
`;

const Propeller = styled(motion.img)`
  width: 80px; 
  height: 80px;
`;

const LoadingText = styled.p`
  color: white;
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
`;

const LoadingBarContainer = styled.div`
  width: 160px;
  height: 6px;
  background-color: rgba(255, 255, 255, 0.2); 
  overflow: hidden;
  margin-top: 12px;
  border-radius: 4px;
`;

const LoadingBar = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: #e50539;
`;

const Loader: React.FC = () => {
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
          transition={{ duration: 3, ease: "linear" }}
        />
      </LoadingBarContainer>
    </LoaderContainer>
  );
};

export default Loader;
