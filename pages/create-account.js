import React from "react"
import Link from "next/link"
import { isEmpty } from "lodash";
import passwordValidator from "password-validator";

import "../styles.scss"
import App from "../components/App"

class CreateAccountPage extends React.Component {
    state = {
        email: "",
        password: "",
        confirmPassword: "",
        showSuccessMessage: false,
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
                showSuccessMessage: true,
            });
        } else {
            this.setState({ errors });
        }
    };

    render () {
        const { errors, showSuccessMessage } = this.state;
        const {
            invalidEmail,
            invalidPassword,
            passwordMismatch,
        } = errors;

        return (
            <App>
                <div className="auth-page">
                    <h1>Request Account</h1>
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

                    { showSuccessMessage ? <SuccessMessage/> : <Disclaimer/>}

                    <p>Already have an account?</p>
                    <Link href="/login">
                        <a>Login</a>
                    </Link>
                </div>
            </App>
        );
    }
}

const SuccessMessage = () => (
    <p className="success-message">
        Thanks for requesting an account!
        <br/>
        We'll reach out to you shortly.
    </p>
);

const Disclaimer = () => (
    <p className="sub-text">
        This tool is not publicly available yet. If you'd
        like an account, fill out the form above and someone
        will contact you.
    </p>
);

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
    const schema = new passwordValidator();
    schema
        .is().min(16)
        .has().uppercase()
        .has().lowercase()
        .has().digits();
    return schema.validate(password);
};

export default CreateAccountPage