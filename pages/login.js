import React from "react"
import Link from "next/link"

import "../styles.scss"
import App from "../components/App"

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
        }
    }

    render() {
        return (
            <App>
                <div className="auth-page">
                    <h1>Login</h1>
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
                    <p>Don't have an account?</p>
                    <Link href="/create-account">
                        <a>Create Account</a>
                    </Link>
                </div>
            </App>
        );
    }

    updateInput = (name) => (event) => {}
}

export default LoginPage