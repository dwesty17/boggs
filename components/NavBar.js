import React from "react";
import styled from "styled-components";
import moment from "moment";

import {AQUA} from "../styles/colors";
import SignOutButton from "./SignOutButton";

const NavBar = ({ onSignOut }) => (
  <NavBarContainer>
      <div>
          {moment().format("dddd, MMMM D, YYYY")}
      </div>

      <div>
          <SignOutButton onSignOut={onSignOut} />
      </div>
  </NavBarContainer>
);

const NavBarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 50px;
  padding: 0 20px;
  background-color: ${AQUA};
`;

// const LeftContainer = styled.div``;
// const RightContainer = styled.div``;

export default NavBar;
