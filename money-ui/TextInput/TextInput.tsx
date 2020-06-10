import React, {forwardRef, useState} from "react";
import styled from "styled-components";

import { Caption } from "../typography";
import { Color } from "../../styles";

interface Props {
    value?: string;
    fullWidth?: boolean;
    width?: number;
    private?: boolean;
    hint?: string;
    error?: string;
    placeholder?: string;
    defaultValue?: string;
    onChange: (newValue: string) => void;
}

// TODO should we require that this is used as a controlled component?
const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const newValue = event.currentTarget.value;
        setValue(newValue);
        props.onChange(newValue);
    };

    return (
        <Container>
            <InputWrapper
                {...props}
                value={value}
                ref={ref}
                type={props.private ? "password" : "text"}
                onChange={handleChange}
            />
            {props.error && (
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

interface WrapperProps {
    fullWidth?: boolean;
    width?: number;
    error?: boolean;
    [propName: string]: any;
}

const InputWrapper = styled.input<WrapperProps>`
  height: 40px;
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
