import styled, { css } from "styled-components";

import { Color } from "../../styles";

const Button = styled.button`
  height: ${(props) => getHeight(props)}px;
  width: ${(props) => props.fullWidth ? "100%" : "fit-content"};
  font-size: ${(props) => getFontSize(props)}px;
  font-weight: 500;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  box-shadow: ${(props) => props.noShadow ? "none" : `0 3px 5px ${Color.Alto}`};
  box-sizing: border-box;
  cursor: pointer;
  -webkit-appearance: none;
  
  background-color: ${Color.White};
  color: ${Color.ShipGrey};
  
  &:active {
    background-color: ${Color.Alto};
  }
  
  &:focus {
    box-shadow: 0 0 5px 3px ${Color.Portage};
  }
  
  ${(props) => props.primary && PrimaryStyles};
  ${(props) => props.disabled && DisabledStyles};
`;

const getHeight = (props) => {
  if (props.size === "small") { return 30; }
  if (props.size === "large") { return 40; }
  return 35;
};

const getFontSize = (props) => {
  if (props.size === "small") { return 12; }
  if (props.size === "large") { return 18; }
  return 16;
};

const PrimaryStyles = css`
  @keyframes click {
    from { background-color: ${Color.GovernorsBay}; }
    to { background-color: ${Color.Arapawa}; }
  }

  background-color: ${Color.GovernorsBay};
  color: ${Color.White};
  
  &:active {
    animation-name: click;
    animation-duration: 0.5s;
    background-color: ${Color.Arapawa};
  }
`;

const DisabledStyles = css`
  opacity: 0.4;
  cursor: default;
  
  &:active {
    background-color: ${Color.White};
  }
`;

export default Button;
