import React from "react";

import LoginForm from "./LoginForm";

export default {
  title: "components/auth/LoginForm",
};

export const Default = () => <LoginForm />;
export const InvalidAttempt = () => <LoginForm error={{ isInvalid: true }}/>;
export const GenericError = () => <LoginForm error={{ isInvalid: false }} />;
