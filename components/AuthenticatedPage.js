import React from "react";

import "../styles.scss";
import NavBar from "./NavBar";

const AuthenticatedPage = ({ children }) => (
    <>
        <NavBar />
        <div className="main-view">
            { children }
        </div>
    </>
);

export default AuthenticatedPage;
