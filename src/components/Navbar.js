import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({ user, handleLogout }) => {
  return (
    <div className="nav-bar">
      {user ? (
        <div>
          Hello, {user.username}
          <NavLink to="/" className="navbar-list" onClick={handleLogout}>
            Logout
          </NavLink>
          <NavLink to="/problems" className="navbar-list">
            {" "}
            All Problems{" "}
          </NavLink>
          <NavLink to="/profile" className="navbar-list">
            {" "}
            Profile{" "}
          </NavLink>
        </div>
      ) : null}
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(Navbar);
