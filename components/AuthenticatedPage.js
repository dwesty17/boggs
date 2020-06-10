import React from "react";
import styled from "styled-components";

import Navbar from "./Navbar";

const AuthenticatedPage = ({children}) => <>
        <Navbar />
        <SiteContainer>
            { children }
        </SiteContainer>
    </>,
    SiteContainer = styled.div`
    padding: 20px;
`;

export default AuthenticatedPage;
