import React from 'react';

import SignUpForm from "./SignUpForm";

export default {
  title: "auth/SignUpForm",
};

export const Default = () => <SignUpForm />;
export const GenericError = () => <SignUpForm error={{ isInvalid: false }} />;
