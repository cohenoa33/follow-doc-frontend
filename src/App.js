import React from "react";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";
import "./App.css";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Home from "./containers/Home";
import ProfileContainer from "./containers/ProfileContainer";

class App extends React.Component {
  state = {
    user: {},
  };

  handleLoginSubmit = (e, user) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
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
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          this.handleAuthResponse(data);
        } else {
          alert(data.error);
        }
      });
  };

  handleAuthResponse = (data) => {
    if (data.user) {
      localStorage.token = data.token;
      this.setState(
        {
          user: {
            id: data.user.id,
            username: data.user.username,
            token: data.token,
          },
        },
        () => {
          this.props.history.push("/profile");
          console.log("I'm in ");
        }
      );
    } else {
      alert(data.error);
    }
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

  renderProfile = () => <ProfileContainer />;

  render() {
    return (
      <div>
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
