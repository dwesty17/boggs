import styled, { css } from "styled-components";

import { Color } from "../../styles";

const Button = styled.button`
  height: 35px;
  width: ${(props) => props.fullWidth ? "100%" : "fit-content"};
  font-size: 16px;
  border: none;
  border-radius: 4px;
  padding: 5px 15px;
  box-shadow: 0 3px 5px ${Color.Fog};
  box-sizing: border-box;
  cursor: pointer;
  
  background-color: ${Color.White};
  color: ${Color.ShipGrey};
  
  &:active {
    background-color: ${Color.Alto};
  }
  
  ${(props) => props.primary && PrimaryStyles};
  ${(props) => props.disabled && DisabledStyles};
`;

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
  background-color: ${Color.White};
  color: ${Color.Alto};
  
  &:active {
    background-color: ${Color.White};
  }
`;

export default Button;
