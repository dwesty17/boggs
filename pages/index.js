import React from "react";

import "../styles.scss";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

const Dashboard = ({ loggedInUser }) => {
    return (
        <div>
            Welcome, {loggedInUser.id}!
        </div>
    );
};

Dashboard.getInitialProps = async (context) => {
    const { loggedInUser } = await checkLoggedIn(context.apolloClient);

    if (!loggedInUser.user) {
        redirect(context, "/login");
    }

    return { loggedInUser }
};

export default Dashboard
