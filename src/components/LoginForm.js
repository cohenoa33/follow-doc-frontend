import React from "react";
import { Link } from "react-router-dom";

export default class LoginForm extends React.Component {
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
                onChange={this.handleChange}
                type="password"
                value={this.state.password}
                name="password"
                placeholder="Password"
              ></input>
              <br />
              <button>Login</button>
            </form>
            <div>
              <br></br>
              <Link to="/signup" className="signup-link">
                New here?
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
