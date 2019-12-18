import React, { useState } from "react";
import { useApolloClient, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import cookie from "cookie";

import "../styles.scss";
import redirect from "../lib/redirect";

const NINETY_DAYS = 30 * 24 * 60 * 60;

const LOGIN_USER_MUTATION = gql`
    mutation LoginUser($user: UserInput!) {
        loginUser(user: $user) {
            id
            token
        }
    }
`;

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const client = useApolloClient();
    const [loginUser] = useMutation(LOGIN_USER_MUTATION, {
        onCompleted({ loginUser }) {
            setEmail("");
            setPassword("");
            setErrors({});

            if (loginUser.token) {
                document.cookie = cookie.serialize("token", loginUser.token, {
                    maxAge: NINETY_DAYS,
                    path: "/"
                });
                client.cache.reset().then(() => { redirect({}, "/"); });
            } else {
                setErrors({ invalidCredentials: true });
            }
        },
        onError (error) {
            if (error) {
                console.error(error);
                setErrors({ failedConnection: true });
            }
        },
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        await loginUser({
            variables: {
                user: { email, password },
            },
        });
    };

    const { invalidCredentials, failedConnection } = errors;

    return (
        <form className="auth-form">
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={(event) => { setEmail(event.target.value); }}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(event) => { setPassword(event.target.value); }}
            />
            <button
                disabled={!email && !password}
                onClick={handleSubmit}
            >
                Login
            </button>
            { invalidCredentials && "Invalid credentials" }
            { failedConnection && "We're experiencing some issues" }
        </form>
    );
};

export default LoginForm;
