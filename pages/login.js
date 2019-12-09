import React from "react"
import Link from "next/link"

import "../styles.scss"
import LoginForm from "../components/LoginForm";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

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

LoginPage.getInitialProps = async ({ apolloClient }) => {
    const { loggedInUser } = await checkLoggedIn(apolloClient);

    if (loggedInUser.token) {
        redirect(context, "/");
    }

    return {}
};

export default LoginPage;
