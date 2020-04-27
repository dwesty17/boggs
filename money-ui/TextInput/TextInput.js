import React from "react";
import styled from "styled-components";

import { Color } from "../../styles";

const TextInput = (props) => (
    <InputWrapper
        {...props}
        type={props.private ? "password" : "text"}
    />
);

const InputWrapper = styled.input`
  height: 35px;
  width: ${(props) => props.fullWidth ? "100%" : `${props.width || 300}px`};
  font-size: 16px;
  background: ${Color.White};
  border: none;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0 3px 5px ${Color.Alto};
  box-sizing: border-box;
`;

export default TextInput;
