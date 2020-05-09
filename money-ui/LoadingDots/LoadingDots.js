import React from "react";
import styled, { keyframes } from "styled-components";

import { Color } from "../../styles";

const LoadingDots = ({ color }) => (
    <Container>
        <Dot1 color={color}/>
        <Dot2 color={color}/>
        <Dot3 color={color}/>
    </Container>
);

const bounceDelay = keyframes`
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 
  
  40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 35px;
  margin: 100px auto 0;
`;

const Dot1 = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${(props) => props.color || Color.Portage};
  border-radius: 100%;
  display: inline-block;
  
  -webkit-animation: ${bounceDelay} 1.4s -0.32s infinite ease-in-out both;
  animation: ${bounceDelay} 1.4s -0.32s infinite ease-in-out both;
`;

const Dot2 = styled.div`
  width: 12px;
  height: 12px;
  background-color: ${(props) => props.color || Color.Portage};
  border-radius: 100%;
  display: inline-block;
  
  -webkit-animation: ${bounceDelay} 1.4s -0.16s infinite ease-in-out both;
  animation: ${bounceDelay} 1.4s -0.16s infinite ease-in-out both;
`;

const Dot3 = styled.div`
  width: 6px;
  height: 6px;
  background-color: ${(props) => props.color || Color.Portage};
  border-radius: 100%;
  display: inline-block;
  
  -webkit-animation: ${bounceDelay} 1.4s infinite ease-in-out both;
  animation: ${bounceDelay} 1.4s infinite ease-in-out both;
`;

export default LoadingDots;
