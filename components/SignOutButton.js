import React from "react";
import { useApolloClient } from "@apollo/react-hooks";

import "../styles.scss";
import redirect from "../lib/redirect"
import cookie from "cookie";

const SignOutButton = () => {
    const client = useApolloClient();

    const signOut = async () => {
        document.cookie = cookie.serialize("token", null, { maxAge: -1, path: "/" });
        await client.cache.reset();
        redirect({}, "/login");
    };

    return (
        <button onClick={signOut}>
            Sign out
        </button>
    );
};

export default SignOutButton;