import React, { useState } from "react";
import styled from "styled-components";

import {
    CaptionStyles,
    HeaderStyles,
    TextStyles,
    TitleStyles,
} from "../typography";
import { Color } from "../../styles";

const EditableText = (props) => {
    const [value, setValue] = useState(props.value || "");

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
    };

    const handleFocus = () => {
        if (props.type === "money") {
            setValue(value.replace(/[$,]/g, ""));
        }
    };

    const handleBlur = () => {
        if (props.type === "money") {
            props.onChange && props.onChange(value);
        }
    };

    return (
        <Container contenteditable={true}>
            <TextInput
                {...props}
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <HiddenText{...props}>
                {value}
            </HiddenText>
        </Container>
    );
};

const Container = styled.div`
  width: fit-content;
  position: relative;
`;

const TextInput = styled.input`
  width: 100%;
  position: absolute;
  ${TextStyles};
  ${(props) => props.typography === "caption" && CaptionStyles};
  ${(props) => props.typography === "header" && HeaderStyles};
  ${(props) => props.typography === "title" && TitleStyles};
  background-color: transparent;
  border: none;
  border-radius: 5px;
  outline: none;
  padding: ${(props) => props.compact ? "2px 5px" : "5px 10px"};
  
  &:hover {
    box-shadow: 0 2px 5px ${Color.Alto};
    box-sizing: border-box;
    cursor: pointer;
  }
  
  &:focus {
    box-shadow: 0 0 5px 3px ${Color.Portage};
    box-sizing: border-box;
    cursor: text;
  }
`;

const HiddenText = styled.div`
  visibility: hidden;
  width: fit-content;
  ${TextStyles};
  ${(props) => props.typography === "caption" && CaptionStyles};
  ${(props) => props.typography === "header" && HeaderStyles};
  ${(props) => props.typography === "title" && TitleStyles};
  padding: ${(props) => props.compact ? "2px 5px" : "5px 10px"};
`;

export default EditableText;
