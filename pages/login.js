import React from "react"
import Link from "next/link"

import "../styles.scss"
import LoginForm from "../components/LoginForm";

const LoginPage = () => (
    <div className="auth-page">
        <h1>Login</h1>
        <LoginForm />
        <p>Don't have an account?</p>
        <Link href="/create-account">
            <a>Create Account</a>
        </Link>
    </div>
);

export default LoginPage;
