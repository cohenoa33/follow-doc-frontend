import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({ searchBar, user, handleLogout, newAppointment }) => {
  return (
    <div className="navbar">
      <div className="navbar-list">
        {user ? (
          <div>
            <NavLink to="/" className="navbar-list-followDoc">
              {" "}
              FollowDoc
            </NavLink>
            <NavLink to="/home" className="navbar-list">
              {" "}
              Dashboard{" "}
            </NavLink>
            <NavLink to="/problems" className="navbar-list">
              {" "}
              Problems{" "}
            </NavLink>
            <NavLink to="/appointments" className="navbar-list">
              {" "}
              Appointments{" "}
            </NavLink>
            {newAppointment()}
            <NavLink to="/profile" className="navbar-list">
              {" "}
              Profile{" "}
            </NavLink>
            <NavLink to="/" className="navbar-list" onClick={handleLogout}>
              Logout
            </NavLink>
            {searchBar()}
          </div>
        ) : (
          <div>
            <NavLink to="/" className="navbar-list-followDoc">
              {" "}
              FollowDoc
            </NavLink>
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
