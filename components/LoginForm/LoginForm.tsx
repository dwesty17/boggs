import React, { useState } from "react";
import styled from "styled-components";
import { isEmpty } from "lodash";

import { Button, Caption, SpacedGroup, TextInput } from "../../money-ui";
import { Color } from "../../styles";

interface Props {
    errors: FormErrors;
    onSubmit: (email: string, password: string) => void;
}

interface FormErrors {
    invalidCredentials?: boolean;
    serverError?: boolean;
}

const LoginForm: React.FC<Props> = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await props.onSubmit(email, password);
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

                {!isEmpty(props.errors) && (
                    <Caption color={Color.Crail}>
                        {getErrorMessage(props.errors)}
                    </Caption>
                )}
            </SpacedGroup>
        </form>
    );
};

const getErrorMessage = (errors: FormErrors) => {
    if (errors.invalidCredentials) { return "Invalid credentials"; }
    if (errors.serverError) { return "Something went wrong"; }
    return "Something went wrong";
};

const Logo = styled.img`
  width: 250px;
`;

export default LoginForm;
