import React from "react"

import "../styles.scss"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }
    }

    render() {
        return (
            <form className="auth-form">
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                />
                <button onClick={this.handleSubmit}>
                    Login
                </button>
            </form>
        );
    }

    updateInput = (name) => (event) => {}
}

export default LoginForm;
