import React from "react";
import { action } from "@storybook/addon-actions";

import { StoryContainer } from "./utils";
import LoginForm from "../components/LoginForm";

export default {
  title: "LoginForm",
};

export const Basic = () => (
    <StoryContainer>
      <LoginForm />
    </StoryContainer>
);
