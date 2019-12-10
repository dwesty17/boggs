import React from "react";

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

    return { loggedInUser }
};

export default withApollo(Dashboard)
