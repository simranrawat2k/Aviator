import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import styled from "styled-components";
import wheel from "../assets/bg-rotate-old-NCXaJEFI.svg";
import airplane from "../assets/airplane.png";
import Loader from "./Loader";
import FlyingPlane from "./Graph/FlyingPlane";
import AxisDots from "./Graph/AxisDots";
import Points from "./Graph/Points";
import RoundHistory from "./RoundHistory";

const GraphBox = styled(Box)<{ loading: boolean }>`
  background: url(${wheel}) no-repeat center;
  background-size: 2760px 2760px;
  background-position: -1380px -967px;
  border: 2px solid #2c2d30;
  width: 99%;
  height: 90%;
  margin: 5px 5px 5px 0px;
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ loading }) =>
    !loading &&
    `
    background: #101011;
  `}
`;

const RotatingWheel = styled(Box)<{ isRotating: boolean }>`
  position: absolute;
  width: 2760px;
  height: 2760px;
  top: -967px;
  left: -1380px;
  background: url(${wheel}) no-repeat center;
  background-size: contain;
  ${({ isRotating }) =>
    isRotating &&
    `
    animation: rotateWheel 20s linear infinite;
    @keyframes rotateWheel {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `}
`;

const Airplane = styled.img`
  position: absolute;
  bottom: -15px;
  left: -15px;
  width: 200px;
  height: auto;
  padding: 0px;
  margin: 0px;
  transform: rotate(10deg);
`;

interface GraphProps {
  roundStart: boolean;
  isPlaneOff: boolean;
}

const Graph: React.FC<GraphProps> = ({ roundStart: loading, isPlaneOff }) => {

  return (
    <Box sx={{ background: "#101011", width: "100%", height: "100%" }}>
      <RoundHistory />
      <GraphBox loading={loading}>
        {loading ? <Loader /> : <RotatingWheel isRotating={!loading} />}
        {loading && <Airplane src={airplane} alt="Airplane" />}
        {!loading && <AxisDots />}
        {!loading && <FlyingPlane />}
        {!loading && <Points isPlaneOff={isPlaneOff} />}
      </GraphBox>
    </Box>
  );
};

export default Graph;
