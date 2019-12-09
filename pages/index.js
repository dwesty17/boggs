import React from "react";

import "../styles.scss";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

const Dashboard = ({ loggedInUser }) => {
    return (
        <div>
            Welcome, {loggedInUser.email}!
        </div>
    );
};

Dashboard.getInitialProps = async ({ apolloClient }) => {
    const { loggedInUser } = await checkLoggedIn(apolloClient);

    if (!loggedInUser.token) {
        redirect(context, "/login");
    }

    return { loggedInUser }
};

export default Dashboard
