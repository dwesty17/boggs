import React from "react";
import Link from "next/link";

import { withApollo } from "../lib/apollo";
import LoginForm from "../components/LoginForm";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const LoginPage = () => (
    <div className="auth-page">
        <h1>Login</h1>
        <LoginForm />
        <p>{ "Don't have an account?" }</p>
        <Link href="/create-account">
            <a>Request Account</a>
        </Link>
    </div>
);

LoginPage.getInitialProps = async (context) => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.token) {
        redirect(context, "/");
    }

    return {};
};

export default withApollo(LoginPage);
