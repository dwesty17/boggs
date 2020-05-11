import React, { forwardRef, useState } from "react";
import styled from "styled-components";

import { Caption } from "../typography";
import { Color } from "../../styles";

const TextInput = forwardRef((props, ref) => {
    const [value, setValue] = useState("");

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        props.onChange && props.onChange(newValue);
    };

    return (
        <Container>
            <InputWrapper
                value={value}
                {...props}
                ref={ref}
                type={props.private ? "password" : "text"}
                onChange={handleChange}
            />
            {props.error && (typeof props.error === "string") && (
                <PaddedCaption color={Color.Crail}>{props.error}</PaddedCaption>
            )}
            {props.hint && !props.error && (
                <PaddedCaption>{props.hint}</PaddedCaption>
            )}
        </Container>
    );
});

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
  outline: none;
  -webkit-appearance: none;
  
  &:focus {
    box-shadow: 0 0 5px 3px ${Color.Portage};
  }
  
  &::placeholder {
    color: ${Color.SilverChalice};
  }
`;

const PaddedCaption = styled(Caption)`
  margin-top: 7px;
`;

export default TextInput;
