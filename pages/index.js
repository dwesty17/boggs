import React from "react";
import PropTypes from 'prop-types';

import "../styles.scss";
import { withApollo } from "../lib/apollo";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

const Dashboard = ({ loggedInUser }) => {
    return (
        <div>
            Welcome, {loggedInUser.email}!
        </div>
    );
};

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

export default withApollo(Dashboard)
