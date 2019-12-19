import React from "react";
import PropTypes from "prop-types";

import "../styles.scss";
import "../components/AuthenticatedPage";
import { withApollo } from "../lib/apollo";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";
import AuthenticatedPage from "../components/AuthenticatedPage";

const Dashboard = () => (
    <AuthenticatedPage>
    </AuthenticatedPage>
);

Dashboard.getInitialProps = async (context) => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.token) {
        redirect(context, "/login");
    }

    return { loggedInUser };
};

Dashboard.propTypes = {
    loggedInUser: PropTypes.shape({
        id: PropTypes.number.isRequired,
        token: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
};

export default withApollo(Dashboard);
