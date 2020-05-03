import React from "react";

import LoginForm from "./LoginForm";

export default {
  title: "components/LoginForm",
};

export const Default = () => <LoginForm />;
export const InvalidAttempt = () => <LoginForm errors={{ invalidCredentials: true }}/>;
export const GenericError = () => <LoginForm errors={{ serverError: true }} />;
