import React, { useState } from "react"
import { isEmpty } from "lodash";
import passwordValidator from "password-validator";
import { useMutation, useApolloClient } from "@apollo/react-hooks";
import gql from "graphql-tag";

import "../styles.scss"

const CREATE_USER_MUTATION = gql`
    mutation CreateUser($user: UserInput!) {
        createUser(user: $user) {
            id
            token
            email
            isAdmin
        }
    }
`;

const CreateAccountForm = ({ handleSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};
        if (!validateEmail(email)) { newErrors.invalidEmail = true }
        if (!validatePassword(password)) { newErrors.invalidPassword = true }
        if (password !== confirmPassword) { newErrors.passwordMismatch = true }

        if (isEmpty(errors)) {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setErrors({});
            handleSuccess();
        } else {
            setErrors(errors);
        }
    };

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit}
        />
    );
};

class CreateAccountFormClass extends React.Component {
    state = {
        email: "",
        password: "",
        confirmPassword: "",
        errors: {},
    };

    updateInput = (name) => (event) => {
        this.setState({ [name]: event.target.value })
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const { email, password, confirmPassword } = this.state;
        const errors = {};

        if (!validateEmail(email)) { errors.invalidEmail = true }
        if (!validatePassword(password)) { errors.invalidPassword = true }
        if (password !== confirmPassword) { errors.passwordMismatch = true }

        if (isEmpty(errors)) {
            this.setState({
                email: "",
                password: "",
                confirmPassword: "",
            });
            this.props.handleSuccess();
        } else {
            this.setState({ errors });
        }
    };

    render () {
        const { errors } = this.state;
        const {
            invalidEmail,
            invalidPassword,
            passwordMismatch,
        } = errors;

        return (
            <form
                className="auth-form"
                onSubmit={this.handleSubmit}
            >
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className={invalidEmail ? "invalid-input" : ""}
                    onChange={this.updateInput("email")}
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    className={invalidPassword ? "invalid-input" : ""}
                    onChange={this.updateInput("password")}
                />
                <input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm password"
                    className={passwordMismatch ? "invalid-input" : ""}
                    onChange={this.updateInput("confirmPassword")}
                />
                <button onClick={this.handleSubmit}>
                    Request
                </button>
            </form>
        );
    }
}

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    const schema = new passwordValidator();
    schema.is().min(18);
    return schema.validate(password);
};

export default CreateAccountForm
