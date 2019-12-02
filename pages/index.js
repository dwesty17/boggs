import React from "react";
import { useApolloClient } from "@apollo/react-hooks";

import "../styles.scss";
import redirect from "../lib/redirect";
import checkLoggedIn from "../lib/checkLoggedIn";

const Dashboard = ({ loggedInUser }) => {
    const apolloClient = useApolloClient();

    return (
        <div>
            TODO Dashboard
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
