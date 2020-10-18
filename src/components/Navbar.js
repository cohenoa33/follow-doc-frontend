import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({ searchBar, user, handleLogout }) => {
  return (
    <div className="nav-bar">
      <div className="navbar-list">
        <NavLink to="/" className="navbar-list-followDoc">
          {" "}
          FollowDoc
        </NavLink>
        {user ? (
          <div>
            <NavLink to="/home" className="navbar-list">
              {" "}
              {user.username} Profile{" "}
            </NavLink>
            <NavLink to="/problems" className="navbar-list">
              {" "}
              All Problems{" "}
            </NavLink>
            <NavLink to="/appointments" className="navbar-list">
              {" "}
              All Appointments{" "}
            </NavLink>
            <NavLink to="/" className="navbar-list" onClick={handleLogout}>
              Logout
            </NavLink>
            {searchBar()}
          </div>
        ) : (
          <div>
            <NavLink to="/login" className="navbar-list">
              {" "}
              Login{" "}
            </NavLink>
            <NavLink to="/signup" className="navbar-list">
              {" "}
              Signup{" "}
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};
export default connect(mapStateToProps)(Navbar);
