import React from "react";
import moment from "moment";

import "../styles.scss";
import SignOutButton from "./SignOutButton";

const NavBar = () => (
  <nav className="nav-bar">
      <div className="strong-side">
          {moment().format("dddd, MMMM D, YYYY")}
      </div>

      <div className="right-side">
          <SignOutButton/>
      </div>
  </nav>
);

export default NavBar;
