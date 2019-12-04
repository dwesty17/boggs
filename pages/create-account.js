import React from "react"
import Link from "next/link"

import "../styles.scss";
import "../components/CreateAccountForm";
import CreateAccountForm from "../components/CreateAccountForm";
import checkLoggedIn from "../lib/checkLoggedIn";
import redirect from "../lib/redirect";

class CreateAccountPage extends React.Component {
    state = {
        showSuccessMessage: false,
    };

    handleSuccess = () => {
        this.setState({ showSuccessMessage: true })
    };

    render () {
        const { showSuccessMessage } = this.state;

        return (
            <div className="auth-page">
                <h1>Request Account</h1>
                <CreateAccountForm
                    handleSuccess={this.handleSuccess}
                />

                { showSuccessMessage ? <SuccessMessage/> : <Disclaimer/>}

                <p>Already have an account?</p>
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </div>
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

CreateAccountPage.getInitialProps = async (context) => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (loggedInUser.user) {
        redirect(context, "/");
    }

    return {}
};

export default CreateAccountPage
