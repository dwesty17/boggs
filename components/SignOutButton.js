import React from "react";
import { useApolloClient } from "@apollo/react-hooks";

import redirect from "../lib/redirect";
import cookie from "cookie";

const SignOutButton = ({ onSignOut }) => {
    const client = useApolloClient();

    const signOut = async () => {
        document.cookie = cookie.serialize("token", null, { maxAge: -1, path: "/" });
        await client.cache.reset();
        await redirect({}, "/login");
    };

    return (
        <button onClick={onSignOut || signOut}>
            Sign out
        </button>
    );
};

export default SignOutButton;
