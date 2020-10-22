import React from "react";

export default class Welcome extends React.Component {
  render() {
    return (
      <div>
        <div className="home-page">
          <h1> Welcome to FollowDoc</h1>
          <h3>
            {" "}
            Keep track of your and your family's medical issues and doctor
            appointments.
          </h3>
          <p>
            Create a list of follow-up items, add notes, and upload related
            docs.
          </p>
          <p>
            {" "}
            You will also be able to keep a to-do list of all the ongoing items
            and have an organized list of your future and past appointments.
          </p>
        </div>
      </div>
    );
  }
}
