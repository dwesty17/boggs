import React, { useState } from "react";
import Link from "next/link";

import "../styles.scss";
import { withApollo } from "../lib/apollo";
import CreateAccountForm from "../components/CreateAccountForm";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

const CreateAccountPage = () => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    return (
        <div className="auth-page">
            <h1>Request Account</h1>
            <CreateAccountForm handleSuccess={() => { setShowSuccessMessage(true); }} />
            { showSuccessMessage ? <SuccessMessage/> : <Disclaimer/>}
            <p>Already have an account?</p>
            <Link href="/login">
                <a>Login</a>
            </Link>
        </div>
    );
};

const SuccessMessage = () => (
    <p className="success-message">
        Thanks for requesting an account!
        <br/>
        We&apos;ll reach out to you shortly.
    </p>
);

const Disclaimer = () => (
    <p className="sub-text">
        This tool is not publicly available yet. If you&apos;d
        like an account, fill out the form above and someone
        will contact you.
    </p>
);

CreateAccountPage.getInitialProps = async (context) => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.token) {
        redirect(context, "/");
    }

    return {};
};

export default withApollo(CreateAccountPage);
