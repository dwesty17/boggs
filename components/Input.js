import styled from "styled-components";

import {SILVER, RED} from "../styles/colors";

const Input = styled.input`
  height: 40px;
  width: 100%;
  font-size: 16px;
  margin-bottom: 20px;
  border: none;
  border-bottom: ${({isInvalid}) => isInvalid ? `0.5px solid ${RED}` : `0.5px solid ${SILVER}`};
`;

export default Input;
