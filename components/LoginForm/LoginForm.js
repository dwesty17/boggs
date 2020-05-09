import React, { useState } from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";

import { Button, Caption, SpacedGroup, TextInput } from "../../money-ui";
import { Color } from "../../styles";

const LoginForm = ({ errors, onSubmit }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        await onSubmit(email, password);
    };

    return (
        <form onSubmit={handleSubmit}>
            <SpacedGroup alignment="center" space={20}>
                <Logo src="/logos/text-logo-governors-bay.png"/>

                <TextInput
                    value={email}
                    placeholder="email"
                    onChange={setEmail}
                />

                <TextInput
                    private={true}
                    value={password}
                    placeholder="password"
                    onChange={setPassword}
                />

                <Button
                    primary={true}
                    fullWidth={true}
                    disabled={!email || !password}
                    onClick={handleSubmit}
                >
                    Login
                </Button>

                {!isEmpty(errors) && (
                    <Caption color={Color.Crail}>
                        {getErrorMessage(errors)}
                    </Caption>
                )}
            </SpacedGroup>
        </form>
    );
};

const getErrorMessage = (errors) => {
    if (errors.invalidCredentials) { return "Invalid credentials"; }
    return "Something went wrong";
};

const Logo = styled.img`
  width: 250px;
`;

export default LoginForm;
