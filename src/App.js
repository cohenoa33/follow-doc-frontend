import React from "react";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./App.css";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Home from "./containers/Home";

class App extends React.Component {
  state = {
    user: {},
  };
  componentDidMount() {
    console.log("componentdidMount");
  }
  handleLoginSubmit = (event) => {
    console.log("handleLoginSubmit");
  };
  handleSignUpSubmit = (event, user) => {
    event.preventDefault();
    console.log("handleSignUpSubmit");
  };

  handleAuthResponse = (response) => {
    console.log("handleAuthResponse");
  };

  handleLogout = () => {
    console.log("handleLogout");
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

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={this.renderHomePage} />
          <Route path="/login" component={this.renderLogin} />
          <Route path="/signup" component={this.renderSignup} />
        </Switch>
      </div>
    );
  }
}

export default App;
