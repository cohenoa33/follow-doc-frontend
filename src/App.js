import React from "react";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

import api from "./services/api";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import NewProblem from "./components/NewProblem";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import ProfileContainer from "./containers/ProfileContainer";
import { setLogin, setLogout } from "./actions";

class App extends React.Component {
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

      this.props.setLogin(data);
      this.props.history.push("/profile");
    } else {
      alert(data.error);
    }
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.setLogout();
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

  renderProfile = () => <ProfileContainer />;
  renderNavBar = () => <Navbar handleLogout={this.handleLogout} />;
  renderNewProblem = () => <NewProblem />;

  render() {
    return (
      <div>
        {this.renderNavBar()}
        <Switch>
          <Route exact path="/" component={this.renderHomePage} />
          <Route path="/login" component={this.renderLogin} />
          <Route path="/signup" component={this.renderSignup} />
          <Route path="/profile" component={this.renderProfile} />
          <Route path="/newproblem" component={this.renderNewProblem} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (user) => dispatch(setLogin(user)),
    setLogout: () => dispatch(setLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
