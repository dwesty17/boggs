import React from "react";
import styled from "styled-components";

import { Button, Caption, SpacedGroup, TextInput } from "../../money-ui";
import { Color } from "../../styles";

const LoginForm = ({ error }) => {
    let errorMessage = "";
    if (error) {
        errorMessage = error.isInvalid ? "Invalid credentials" : "Something went wrong";
    }

    return (
        <SpacedGroup alignment="center" space={20}>
            <Logo src="/logos/text-logo-governors-bay.png"/>

            <TextInput placeholder="email"/>
            <TextInput private={true} placeholder="password"/>

            <Button primary={true} fullWidth={true}>
                Login
            </Button>

            {errorMessage && (
                <Caption color={Color.Crail}>
                    {errorMessage}
                </Caption>
            )}
        </SpacedGroup>
    );
};

const Logo = styled.img`
  width: 250px;
`;

export default LoginForm;
