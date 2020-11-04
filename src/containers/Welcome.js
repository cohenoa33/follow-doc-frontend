import React from "react";
import { Link } from "react-router-dom";

const Welcome = ({ user }) => {
  return (
    <div>
      <div className="home-page">
        <h1> Welcome to FollowDoc</h1>

        <br />
        <h3>
          {" "}
          Keep track of your and your family's medical issues and doctor
          appointments.
        </h3>
        <p>
          Create a list of follow-up items, add notes, and upload related docs.
        </p>
        <p>
          {" "}
          You will also be able to keep a to-do list of all the ongoing items
          and have an organized list of your future and past appointments.
        </p>

        <br />
        {!user.jwt ? (
          <div>
            <Link to="/signin">
              {" "}
              <button className="btn">Sign In</button>
            </Link>
            <br />
            <Link to="/signup">
              {" "}
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        ) : null}
        <br />
      </div>
      <br />
    </div>
  );
};

export default Welcome;
