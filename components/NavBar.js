import React from "react";
import Link from "next/link";

import "../styles.scss";
import SignOutButton from "./SignOutButton";

const NavBar = () => (
  <nav className="nav-bar">
      <div className="strong-side">
          <Link href="/">
              <a>$$$</a>
          </Link>
      </div>

      <div className="right-side">
          <SignOutButton/>
      </div>
  </nav>
);

export default NavBar;
