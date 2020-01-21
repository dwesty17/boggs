import React from 'react';
import styled from "styled-components";

import {StoryContainer} from "./utils";
import {WHITE} from "../styles/colors";

import Input from "../components/Input";

export default {
  title: 'Input',
};

const FormContainer = styled.form`
  width: 200px;
  padding: 20px;
  margin: 20px auto;
  background-color: ${WHITE};
`;

export const Basic = () => (
    <StoryContainer noPadding={true}>
        <FormContainer>
            <h2>Form</h2>
            <Input placeholder="Basic input"/>
            <Input placeholder="Calculator input" />
        </FormContainer>
    </StoryContainer>
);
