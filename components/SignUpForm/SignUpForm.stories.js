import React from "react";
import { action } from "@storybook/addon-actions";

import { SpacedGroup } from "../../money-ui";

import SignUpForm from "./SignUpForm";

export default {
  title: "components/SignUpForm",
};

export const Default = () => <SignUpForm onSubmit={action("Sign Up!")}/>;
export const GenericError = () => (
  <SignUpForm
    errors={{ serverError: true }}
    onSubmit={action("Sign Up!")}
  />
);
export const InvalidFields = () => (
  <SpacedGroup direction="row" space={75}>
    <SignUpForm
      errors={{
        emailInUse: true,
        shortPassword: true,
        passwordMismatch: true,
      }}
      onSubmit={action("Sign Up!")}
    />

    <SignUpForm
      errors={{
        invalidEmail: true,
        commonPassword: true,
      }}
      onSubmit={action("Sign Up!")}
    />
  </SpacedGroup>
);
