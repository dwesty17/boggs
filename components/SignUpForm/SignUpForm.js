import React from "react";

import {
  Button,
  Caption,
  Pennyworth,
  SpacedGroup,
  TextInput,
} from "../../money-ui";
import { Color } from "../../styles";

const SignUpForm = ({ error }) => {
  let errorMessage = "";
  if (error) {
    errorMessage = "Something went wrong";
  }

  return (
    <SpacedGroup alignment="center" space={20}>
      <Pennyworth/>

      <TextInput placeholder="email"/>
      <TextInput private={true} placeholder="password"/>
      <TextInput private={true} placeholder="confirm password"/>

      <Button primary={true} fullWidth={true}>
        Sign Up
      </Button>

      {errorMessage && (
        <Caption color={Color.Crail}>
          {errorMessage}
        </Caption>
      )}
    </SpacedGroup>
  );
};

export default SignUpForm;
