import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

import api from "./services/api";
import { reauth, setLogin, setLogout } from "./actions";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import NewProblem from "./components/NewProblem";
import OneProblem from "./components/OneProblem";
import Navbar from "./components/Navbar";
import Home from "./containers/Home";
import ProfileContainer from "./containers/ProfileContainer";
import ProblemsContainer from "./containers/ProblemsContainer";

class App extends React.Component {
  handleLoginSubmit = (e, user) => {
    e.preventDefault();
    api.auth
      .login(user)
      .then((json) => {
        if (!json.error) {
          console.log(json);
          this.handleAuthResponse(json);
        } else {
          alert("handleLoginSubmit");
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
  componentDidMount() {
    if (localStorage.token) {
      api.auth.reauth().then((data) => {
        if (!data.error) {
          this.props.setLogin(data);
          this.props.history.push("/profile");
        } else {
          alert("componentDidMount");
        }
      });
    }
  }

  handleAuthResponse = (data) => {
    if (data.user) {
      localStorage.token = data.jwt;

      this.props.setLogin(data);
      this.props.history.push("/profile");
    } else {
      alert("handleAuthResponse");
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
  renderAllProblem = () => <ProblemsContainer />;
  renderOneProblem = (id) => <OneProblem slug={id} />;

  render() {
    return (
      <div>
        {this.renderNavBar()}
        <Switch>
          <Route exact path="/" component={this.renderHomePage} />
          <Route exact path="/login" component={this.renderLogin} />
          <Route exact path="/signup" component={this.renderSignup} />
          <Route exact path="/profile" component={this.renderProfile} />
          <Route exact path="/newproblem" component={this.renderNewProblem} />
          <Route exact path="/problems" component={this.renderAllProblem} />
          <Route exact path="/problems/:id" render={this.renderOneProblem} />
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
