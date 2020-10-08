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
        <div className="form-grid">
          <Link to="/">
            {" "}
            <button className="x-btn"> x </button>
          </Link>{" "}
          <br />
          <br />
          <br />
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
                placeholder="password Confirmation"
                value={this.state.password_confirmation}
              />
              <br />
              <button className="btn">Signup</button>
            </form>
            <div>
              <br></br>
              <Link to="/login" className="signup-link">
                Have an account?
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
