import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

import api from "./services/api";
import { setLogin, setLogout } from "./actions";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import NewProblem from "./components/NewProblem";
import OneProblem from "./components/OneProblem";
import NotFound from "./components/NotFound";
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
      if (
        this.props.history.location.pathname == "/login" ||
        this.props.history.location.pathname == "/signup"
      ) {
        this.props.history.push("/profile");
      }
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
  renderOneProblem = (routerProps) => {
    let problemId = parseInt(routerProps.match.params.id);
    let foundProblem = this.props.problems.filter(
      (problem) => problem.id === problemId
    );
    return foundProblem ? (
      <OneProblem problem={foundProblem} id={problemId} />
    ) : (
      <NotFound />
    );
  };

  render() {
    return (
      <div>
        {this.renderNavBar()}
        <Switch>
          <Route
            exact
            path="/problems/:id"
            render={(routerProps) => this.renderOneProblem(routerProps)}
          />{" "}
          <Route path="/problems" component={this.renderAllProblem} />
          <Route path="/login" component={this.renderLogin} />
          <Route path="/signup" component={this.renderSignup} />
          <Route path="/profile" component={this.renderProfile} />
          <Route path="/newproblem" component={this.renderNewProblem} />
          <Route path="/" component={this.renderHomePage} />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    problems: state.problems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (user) => dispatch(setLogin(user)),
    setLogout: () => dispatch(setLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
