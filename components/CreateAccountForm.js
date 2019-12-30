import React, {useState} from "react";
import PropTypes from "prop-types";
import {useApolloClient, useMutation} from "@apollo/react-hooks";
import {isEmpty} from "lodash";
import passwordValidator from "password-validator";
import gql from "graphql-tag";
import cookie from "cookie";

import redirect from "../lib/redirect";

const NINETY_DAYS = 30 * 24 * 60 * 60;

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

    const client = useApolloClient();
    const [createUser] = useMutation(CREATE_USER_MUTATION, {
        async onCompleted({ createUser }) {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setErrors({});

            // This should be undefined until I allow accounts to be created without a review process
            if (createUser.token) {
                document.cookie = cookie.serialize("token", createUser.token, {
                    maxAge: NINETY_DAYS,
                    path: "/"
                });
                await client.cache.reset();
                redirect({}, "/");
            }

            handleSuccess();
        },
        onError (error) {
            if (error) {
                console.error(error);
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
            await createUser({
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
                className={invalidEmail ? "invalid-input" : ""}
                name="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => { setEmail(event.target.value); }}
            />
            <input
                className={invalidPassword ? "invalid-input" : ""}
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => { setPassword(event.target.value); }}
            />
            <input
                className={passwordMismatch ? "invalid-input" : ""}
                name="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
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
