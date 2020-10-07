import React from "react";
import { Link } from "react-router-dom";

export default class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
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
          <div className="form-container">
            <form onSubmit={this.props.handleLoginSubmit}>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.username}
                name="username"
                placeholder="username"
              ></input>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={this.state.email}
              />
              <input
                onChange={this.handleChange}
                type="password"
                value={this.state.password}
                name="password"
                placeholder="Password"
              ></input>
              <input
                type="password"
                name="password_confirmation"
                placeholder="password Confirmation"
                value={this.state.password_confirmation}
              />
              <br />
              <button>Signup</button>
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
