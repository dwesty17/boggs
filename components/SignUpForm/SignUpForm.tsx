import React, { useState } from "react";
import styled from "styled-components";
import PasswordValidator from "password-validator";
import { isEmpty } from "lodash";

import { Button, Caption, SpacedGroup, TextInput } from "../../money-ui";
import { Color } from "../../styles";

interface Props {
    errors: FormErrors;
    onSubmit: (email: string, password: string) => void;
}

interface FormErrors {
    emailInUse?: boolean;
    invalidEmail?: boolean;
    shortPassword?: boolean;
    commonPassword?: boolean;
    passwordMismatch?: boolean;
    serverError?: boolean;
}

// TODO add green check marks to text input
// TODO add thanks for signing up message

const SignUpForm = (props: Props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState(props.errors || {});

    const handleSubmit = () => {
        const errors = {
            ...getEmailErrors(email),
            ...getPasswordErrors(password),
            ...getPasswordMatchErrors(password, confirmPassword),
        };

        if (isEmpty(errors)) {
            props.onSubmit(email, password);

            setEmail("");
            setPassword("");
            setConfirmPassword("");
        }

        setErrors(errors);
    };

    return (
        <form onSubmit={handleSubmit}>
            <SpacedGroup alignment="center" space={20}>
                <Logo src="/logos/text-logo-governors-bay.png"/>

                <TextInput
                    value={email}
                    placeholder="email"
                    error={getEmailErrorMessage(errors)}
                    onChange={setEmail}
                />

                <TextInput
                    private={true}
                    value={password}
                    placeholder="password"
                    error={getPasswordErrorMessage(errors)}
                    onChange={setPassword}
                />

                <TextInput
                    private={true}
                    value={confirmPassword}
                    placeholder="confirm password"
                    hint="Passwords must be at least 12 characters"
                    error={getPasswordMatchErrorMessage(errors)}
                    onChange={setConfirmPassword}
                />

                <Button
                    primary={true}
                    fullWidth={true}
                    disabled={!email || !password || !confirmPassword}
                    onClick={handleSubmit}
                >
                    Sign Up
                </Button>

                {props.errors && props.errors.serverError && (
                    <Caption color={Color.Crail}>
                        Something went wrong
                    </Caption>
                )}
            </SpacedGroup>
        </form>
    );
};

const Logo = styled.img`
  width: 250px;
`;

const getEmailErrors = (email: string) => {
    const errors: FormErrors = {};

    if (emailIsInvalid(email)) {
        errors.invalidEmail = true;
    }

    return errors;
};

const emailIsInvalid = (email: string) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(String(email).toLowerCase());
};

const getPasswordErrors = (password: string) => {
    const schema = new PasswordValidator();
    schema.is().min(12);
    const failures = schema.validate(password, { list: true }) as string[];

    const errors: FormErrors = {};

    if (failures.includes("min")) {
        errors.shortPassword = true;
    }
    if (failures.includes("oneOf")) {
        errors.commonPassword = true;
    }
    return errors;
};

const getPasswordMatchErrors = (password: string, confirmPassword: string) => {
    const errors: FormErrors = {};

    if (confirmPassword !== password) {
        errors.passwordMismatch = true;
    }
    return errors;
};

const getEmailErrorMessage = (errors: FormErrors) => {
    if (errors.emailInUse) {
        return "Email is already in use";
    }
    if (errors.invalidEmail) {
        return "Please use a valid email address";
    }
};

const getPasswordErrorMessage = (errors: FormErrors) => {
    if (errors.shortPassword) {
        return "Password is too short";
    }
    if (errors.commonPassword) {
        return "Password is too common";
    }
};

const getPasswordMatchErrorMessage = (errors: FormErrors) => {
    if (errors.passwordMismatch) {
        return "Passwords don't match";
    }
};

export default SignUpForm;
