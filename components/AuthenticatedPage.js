import React from "react";

import NavBar from "./NavBar";

const AuthenticatedPage = ({ children }) => (
    <>
        <NavBar />
        { children }
    </>
);

export default AuthenticatedPage;
