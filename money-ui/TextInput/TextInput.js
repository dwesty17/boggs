import React from "react";
import styled from "styled-components";

import { Caption } from "../typography";
import { Color } from "../../styles";

const TextInput = (props) => (
  <Container>
      <InputWrapper
        {...props}
        type={props.private ? "password" : "text"}
      />
      {props.error && (typeof props.error === "string") && (
        <PaddedCaption color={Color.Crail}>{props.error}</PaddedCaption>
      )}
      {props.hint && !props.error && (
        <PaddedCaption>{props.hint}</PaddedCaption>
      )}
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputWrapper = styled.input`
  height: 35px;
  width: ${(props) => props.fullWidth ? "100%" : `${props.width || 300}px`};
  font-size: 16px;
  background: ${Color.White};
  border: ${(props) => props.error ? `1.5px solid ${Color.Crail}` : "none"};
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0 2px 5px ${Color.Alto};
  box-sizing: border-box;
`;

const PaddedCaption = styled(Caption)`
  margin-top: 7px;
`;

export default TextInput;
