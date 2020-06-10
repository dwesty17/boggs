import React from "react";
import { action } from "@storybook/addon-actions";

import LoginForm from "./LoginForm";

export default {
  title: "components/LoginForm",
};

export const Default = () => (
  <LoginForm
      errors={{}}
      onSubmit={action("onSubmit")}
  />
);

export const InvalidAttempt = () => (
  <LoginForm
      errors={{ invalidCredentials: true }}
      onSubmit={action("onSubmit")}
  />
);

export const ServerError = () => (
  <LoginForm
      errors={{ serverError: true }}
      onSubmit={action("onSubmit")}
  />
);
