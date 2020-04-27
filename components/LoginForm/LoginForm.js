import React from "react";

import {
  Button,
  Caption,
  Pennyworth,
  SpacedGroup,
  TextInput,
} from "../../money-ui";
import { Color } from "../../styles";

const LoginForm = ({ error }) => {
  let errorMessage = "";
  if (error) {
    errorMessage = error.isInvalid ? "Invalid credentials" : "Something went wrong";
  }

  return (
    <SpacedGroup alignment="center" space={20}>
      <Pennyworth/>

      <TextInput placeholder="email"/>
      <TextInput private={true} placeholder="password"/>

      <Button primary={true} fullWidth={true}>
        Login
      </Button>

      <Caption color={Color.Crail}>
        {errorMessage}
      </Caption>
    </SpacedGroup>
  );
};

export default LoginForm;
