import React, { useState } from "react";
import { useApolloClient, useLazyQuery } from "@apollo/react-hooks";
import cookie from 'cookie'
import gql from "graphql-tag";

import "../styles.scss"
import redirect from "../lib/redirect";

const LOGIN_USER_QUERY = gql`
    query LoginUser($user: UserInput!) {
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
    const [loginUser, { called, data, error }] = useLazyQuery(LOGIN_USER_QUERY);

    if (called && error) {
        setErrors({ failedConnection: true });
    }

    if (called && data && data.loginUser) {
        const { token } = data.loginUser;

        if (!token) {
            setErrors({ invalidCredentials: true });
        }

        document.cookie = cookie.serialize("token", data.loginUser.token, {
            maxAge: 30 * 24 * 60 * 60, // 30 days
            path: "/",
        });
        client.cache.reset().then(() => {redirect({}, "/")});
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        loginUser({
            variables: {
                user: { email, password },
            },
        })
    };

    const { invalidCredentials, failedConnection } = errors;

    return (
        <form className="auth-form">
            <input
                name="email"
                type="email"
                placeholder="Email"
                onChange={(event) => { setEmail(event.target.value) }}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={(event) => { setPassword(event.target.value) }}
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
