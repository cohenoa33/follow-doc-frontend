import React from "react";
import { Link } from "react-router-dom";

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <div className="home-page">
          <h1> Welcome to FollowDoc</h1>
          <h3>
            {" "}
            Keep track of your family's medical issues and doctor appointments.
          </h3>
          <p>Create a list of items, add comments, and upload related docs. </p>
          <p>See all the things that you need to handle. </p>
          <p>See all your upcoming appointments. </p>
          <Link to="/login">
            {" "}
            <button className="btn"> Login </button>
          </Link>{" "}
          <Link to="/signup">
            {" "}
            <button className="btn"> Signup </button>
          </Link>
        </div>
      </div>
    );
  }
}
