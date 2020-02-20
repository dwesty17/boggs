import React from "react";
import { useApolloClient } from "@apollo/react-hooks";

import redirect from "../lib/redirect";
import cookie from "cookie";

const SignOutButton = ({ onSignOut }) => {
    const signOut = async () => {
        const client = useApolloClient();
        document.cookie = cookie.serialize("token", null, { maxAge: -1, path: "/" });
        await client.cache.reset();
        redirect({}, "/login");
    };

    return (
        <button onClick={onSignOut || signOut}>
            Sign out
        </button>
    );
};

export default SignOutButton;
