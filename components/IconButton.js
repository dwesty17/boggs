import styled from "styled-components";

import { AQUA, NAVY } from "../styles/colors";

const IconButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;
  height: fit-content;
  background-color: ${AQUA};
  color: ${NAVY};
  font-size: ${({ size }) => `${size}px` || "18px"};
  margin: 0 10px;
  border-radius: 100px;
  border: none;
  padding: 3px;
  box-shadow: 2px 4px 7px;
  cursor: pointer;
`;

export default IconButton;
