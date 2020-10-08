import React from "react";
import { Link } from "react-router-dom";

const Navbar = (props) => {
  console.log(props.user.token);
  return (
    <div className="nav-bar">
      {props.user.token ? (
        <Link to="/" className="navbar-list" onClick={props.handleLogout}>
          {" "}
          Logout{" "}
        </Link>
      ) : null}
    </div>
  );
};

export default Navbar;
