import React from "react";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";

import "./App.css";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Home from "./containers/Home";
class App extends React.Component {
  state = {
    user: {},
  };
  componentDidMount() {
    console.log(localStorage.token);
    if (localStorage.token) {
      fetch("http://localhost:3000/api/v1/persist", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          this.handleAuthResponse(json);
        });
    }
  }
  handleLoginSubmit = (event, user) => {
    event.preventDefault();
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
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
  handleSignUpSubmit = (event, user) => {
    event.preventDefault();
    console.log(user);
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.error) {
          this.handleAuthResponse(json);
        } else {
          alert(json.error);
        }
      });
  };

  handleAuthResponse = (response) => {
    console.log(response);
    // if (response.user) {
    //   localStorage.token = response.jwt;
    //   this.setState({ user: response.user }, () => {
    //     this.props.history.push("/services");
    //   });
    // } else {
    //   alert(response.error);
    // }
  };

  handleLogout = () => {
    // localStorage.removeItem("token");
    // this.setState({ auth: { currentUser: {} } });
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
