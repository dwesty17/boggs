import React, {useState} from "react";
import PropTypes from "prop-types";
import {useApolloClient, useMutation} from "@apollo/react-hooks";
import {isEmpty} from "lodash";
import passwordValidator from "password-validator";
import gql from "graphql-tag";
import cookie from "cookie";

import redirect from "../lib/redirect";

const NINETY_DAYS = 30 * 24 * 60 * 60,

    CREATE_USER_MUTATION = gql`
    mutation CreateUser($user: UserInput!) {
        createUser(user: $user) {
            id
            token
        }
    }
`,

    CreateAccountForm = ({handleSuccess}) => {

        const [
                email,
                setEmail,
            ] = useState(""),
            [
                password,
                setPassword,
            ] = useState(""),
            [
                confirmPassword,
                setConfirmPassword,
            ] = useState(""),
            [
                errors,
                setErrors,
            ] = useState({}),

            client = useApolloClient(),
            [createUser] = useMutation(
                CREATE_USER_MUTATION,
                {
                    async onCompleted ({createUser}) {

                        setEmail("");
                        setPassword("");
                        setConfirmPassword("");
                        setErrors({});

                        // This should be undefined until I allow accounts to be created without a review process
                        if (createUser.token) {

                            document.cookie = cookie.serialize(
                                "token",
                                createUser.token,
                                {
                                    "maxAge": NINETY_DAYS,
                                    "path": "/",
                                },
                            );
                            await client.cache.reset();
                            redirect(
                                {},
                                "/",
                            );

                        }

                        handleSuccess();

                    },
                    onError (error) {

                        if (error) {

                            console.error(error);
                            setErrors({"serverError": true});

                        }

                    },
                },
            ),

            handleSubmit = async (event) => {

                event.preventDefault();

                const newErrors = {};
                if (!validateEmail(email)) {

                    newErrors.invalidEmail = true;

                }
                if (!validatePassword(password)) {

                    newErrors.invalidPassword = true;

                }
                if (password !== confirmPassword) {

                    newErrors.passwordMismatch = true;

                }

                if (isEmpty(newErrors)) {

                    await createUser({
                        "variables": {
                            "user": {email,
                                password},
                        },
                    });

                } else {

                    setErrors(newErrors);

                }

            },

            {
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
                    onChange={(event) => {

                        setEmail(event.target.value);

                    }}
                    placeholder="Email"
                    type="email"
                    value={email}
                />
                <input
                    className={invalidPassword ? "invalid-input" : ""}
                    name="password"
                    onChange={(event) => {

                        setPassword(event.target.value);

                    }}
                    placeholder="Password"
                    type="password"
                    value={password}
                />
                <input
                    className={passwordMismatch ? "invalid-input" : ""}
                    name="confirmPassword"
                    onChange={(event) => {

                        setConfirmPassword(event.target.value);

                    }}
                    placeholder="Confirm password"
                    type="password"
                    value={confirmPassword}
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
    "handleSuccess": PropTypes.func.isRequired,
};

const validateEmail = (email) => {

        const re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());

    },

    validatePassword = (password) => {

        const schema = new passwordValidator();
        // TODO increase once ready for production
        schema.is().min(4);
        return schema.validate(password);

    };

export default CreateAccountForm;
