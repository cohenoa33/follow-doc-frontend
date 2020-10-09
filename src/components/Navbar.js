import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({ user, handleLogout }) => {
  return (
    <div className="nav-bar">
      hello
      {user ? (
        <div>
          <Link to="/" className="navbar-list" onClick={handleLogout}>
            Logout
          </Link>
          <Link to="/problems" className="navbar-list">
            {" "}
            All Problems{" "}
          </Link>
          <Link to="/profile" className="navbar-list">
            {" "}
            Profile{" "}
          </Link>
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
