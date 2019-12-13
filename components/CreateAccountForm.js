import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import { isEmpty } from "lodash";
import passwordValidator from "password-validator";
import gql from "graphql-tag";

import "../styles.scss";

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($user: UserInput!) {
        createUser(user: $user) {
            id
            token
        }
    }
`;

const CreateAccountForm = ({ handleSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const [createUser] = useMutation(CREATE_USER_MUTATION, {
        onCompleted({ createUser }) {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setErrors({});

            // This should be undefined until I allow accounts to be created without a review process
            if (createUser.token) {
                localStorage.setItem("token", data);
            }

            handleSuccess();
        },
        onError (error) {
            if (error) {
                setErrors({ serverError: true });
            }
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newErrors = {};
        if (!validateEmail(email)) { newErrors.invalidEmail = true; }
        if (!validatePassword(password)) { newErrors.invalidPassword = true; }
        if (password !== confirmPassword) { newErrors.passwordMismatch = true; }

        if (isEmpty(newErrors)) {
            createUser({
                variables: {
                    user: { email, password },
                },
            });
        } else {
            setErrors(newErrors);
        }
    };

    const {
        invalidEmail,
        invalidPassword,
        passwordMismatch,
        serverError,
    } = errors;

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit}
        >
            { serverError && "We experienced an error creating your account!" }
            <input
                name="email"
                type="email"
                placeholder="Email"
                className={invalidEmail ? "invalid-input" : ""}
                onChange={(event) => { setEmail(event.target.value); }}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                className={invalidPassword ? "invalid-input" : ""}
                onChange={(event) => { setPassword(event.target.value); }}
            />
            <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className={passwordMismatch ? "invalid-input" : ""}
                onChange={(event) => { setConfirmPassword(event.target.value); }}
            />
            <button
                disabled={!email && !password && !confirmPassword}
                onClick={handleSubmit}
            >
                Request
            </button>
        </form>
    );
};

CreateAccountForm.propTypes = {
    handleSuccess: PropTypes.func.isRequired,
};

const validateEmail = (email) => {
    const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    const schema = new passwordValidator();
    // TODO increase once ready for production
    schema.is().min(4);
    return schema.validate(password);
};

export default CreateAccountForm;
