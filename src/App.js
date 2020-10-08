import React from "react";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";
import "./App.css";

import api from "./services/api";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import ProfileContainer from "./containers/ProfileContainer";

class App extends React.Component {
  state = {
    user: {},
  };

  handleLoginSubmit = (e, user) => {
    e.preventDefault();
    api.auth
      .login(user)
      .then((json) => {
        if (!json.error) {
          this.handleAuthResponse(json);
        } else {
          alert(json.error);
        }
      })
      .catch((err) => console.log(err));
  };

  handleSignUpSubmit = (e, user) => {
    e.preventDefault();
    api.auth.signup(user).then((data) => {
      if (!data.error) {
        this.handleAuthResponse(data);
      } else {
        alert(data.error);
      }
    });
  };

  handleAuthResponse = (data) => {
    if (data.user) {
      localStorage.token = data.jwt;
      this.setState(
        {
          user: {
            id: data.user.id,
            username: data.user.username,
            token: data.jwt,
          },
        },
        () => {
          this.props.history.push("/profile");
        }
      );
    } else {
      alert(data.error);
    }
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.setState({ user: {} });
  };
  renderHomePage = () => <Home />;

  renderLogin = () => (
    <LoginForm
      handleLogin={this.handleLogin}
      handleLoginSubmit={this.handleLoginSubmit}
    />
  );
  renderSignup = () => (
    <SignupForm
      handleLogin={this.handleLogin}
      handleSignUpSubmit={this.handleSignUpSubmit}
    />
  );

  renderProfile = () => <ProfileContainer user={this.state.user} />;
  renderNavBar = () => (
    <Navbar handleLogout={this.handleLogout} user={this.state.user} />
  );

  render() {
    return (
      <div>
        {this.renderNavBar()}
        <Switch>
          <Route exact path="/" component={this.renderHomePage} />
          <Route path="/login" component={this.renderLogin} />
          <Route path="/signup" component={this.renderSignup} />
          <Route path="/profile" component={this.renderProfile} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
