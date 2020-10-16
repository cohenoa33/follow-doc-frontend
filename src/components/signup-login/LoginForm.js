import React from "react";
import { Link } from "react-router-dom";

class LoginForm extends React.Component {
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
          <br />
          <br />
          <div className="form-container">
            <form onSubmit={(e) => this.props.handleLoginSubmit(e, this.state)}>
              <input
                autocomplete="on"
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
              <button className="btn">Login</button>
            </form>
            <div>
              <br></br>
              <Link to="/signup" className="login-signup-link">
                New here?
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
