import React from "react";
import { Link } from "react-router-dom";
import { capitalize } from "../../services/helpers";

export default class SignupForm extends React.Component {
  state = {
    username: "",
    password: "",
    email: "",
    password_confirmation: "",
  };

  handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "username") {
      value = capitalize(e.target.value);
    }
    this.setState({ [e.target.name]: value });
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
              <button className="btn">Create an Account</button>
            </form>
            <div>
              <Link to="/signin">
                <button className="btn-blue">
                  Already have an account? Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
