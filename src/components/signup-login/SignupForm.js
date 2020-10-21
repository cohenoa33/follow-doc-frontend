import React from "react";
import { Link } from "react-router-dom";

export default class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    password_confirmation: "",
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div>
        <br></br>
        <div className="form-grid">
          <Link to="/">
            {" "}
            <button className="back-btn"> back </button>
          </Link>{" "}
          <div className="form-container">
            <form
              onSubmit={(e) => this.props.handleSignUpSubmit(e, this.state)}
            >
              <input
                type="text"
                onChange={this.handleChange}
                value={this.state.username}
                name="username"
                placeholder="username"
              ></input>
              <input
                type="text"
                onChange={this.handleChange}
                name="email"
                placeholder="Email"
                value={this.state.email}
              />
              <input
                type="password"
                onChange={this.handleChange}
                value={this.state.password}
                name="password"
                placeholder="Password"
              ></input>
              <input
                type="password"
                onChange={this.handleChange}
                name="password_confirmation"
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
              />
              <br />
              <button className="btn">Sign Up</button>
            </form>
            <div>
              <Link to="/login">
                <button className="btn-blue">Log In </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
