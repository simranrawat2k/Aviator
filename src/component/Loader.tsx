import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import moveImage from "../assets/move.png"; // Ensure correct path

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #1b1c1d; // Dark background
`;

const Propeller = styled(motion.img)`
  width: 80px; // Adjust size if needed
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
  background-color: rgba(255, 255, 255, 0.2); // Faded background
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
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      />

      {/* Text Below */}
      <LoadingText>WAITING FOR NEXT ROUND</LoadingText>

      {/* Moving Loading Bar */}
      <LoadingBarContainer>
        <LoadingBar
          animate={{ x: ["100%", "-100%"] }} // Move from right to left
          transition={{ duration: 3, ease: "linear" }} // Slower speed (3s)
        />
      </LoadingBarContainer>
    </LoaderContainer>
  );
};

export default Loader;
