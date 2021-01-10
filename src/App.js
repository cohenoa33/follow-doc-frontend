import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";

import api from "./services/api";
import { setDoctors, setLogin, setLogout } from "./actions";

import LoginForm from "./components/signup-login/LoginForm";
import SignupForm from "./components/signup-login/SignupForm";
import NewProblem from "./components/problems/NewProblem";
import OneProblem from "./components/problems/OneProblem";
import OneAppointment from "./components/appointments/OneAppointment";
import NewAppointment from "./components/appointments/NewAppointment";
import ArchiveComments from "./components/comments/ArchiveComments";
import SearchResults from "./components/search/SearchResults";
import NotFound from "./components/NotFound";
import Navbar from "./components/Navbar";
import SearchBar from "./components/search/SearchBar";
import Welcome from "./containers/Welcome";
import HomeContainer from "./containers/HomeContainer";
import ProblemsContainer from "./containers/ProblemsContainer";
import ProfilePage from "./containers/ProfilePage";
import AppointmentsContainer from "./containers/AppointmentsContainer";
import ProblemAppointments from "./components/appointments/ProblemAppointments";
import Footer from "./components/Footer";

class App extends React.Component {
  handleLoginSubmit = (e, user) => {
    e.preventDefault();
    api.auth
      .login(user)
      .then((json) => {
        if (!json.error) {
          this.handleAuthResponse(json);
        } else {
          alert("Wrong Username or Password");
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
          api.doctors.allDoctors().then((data) => {
            if (!data.error) {
              this.props.setDoctors(data);
            }
          });
        } else {
          alert("Please Login");
        }
      });
    }
  }

  handleAuthResponse = (data) => {
    if (data.user) {
      localStorage.token = data.jwt;
      this.props.setLogin(data);

      if (
        this.props.history.location.pathname === "/signup" ||
        this.props.history.location.pathname === "/signin"
      ) {
        this.props.history.push("/home");
      }
    } else {
      alert("Something Went Wrong....");
    }
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.setLogout();
  };

  renderWelcomePage = () => <Welcome user={this.props.user} />;
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
  renderNewAppointment = () => (
    <NewAppointment btnName={"navbar-list-button"} />
  );
  renderProfilePage = () => <ProfilePage />;
  renderHome = () => <HomeContainer />;
  renderSearchBar = () => <SearchBar />;
  renderSearchResults = () => <SearchResults />;
  renderNavBar = () => (
    <Navbar
      handleLogout={this.handleLogout}
      searchBar={this.renderSearchBar}
      newAppointment={this.renderNewAppointment}
    />
  );
  renderNewProblem = (className) => <NewProblem className={className} />;
  renderAllProblem = () => <ProblemsContainer />;
  renderAllAppointments = () => (
    <AppointmentsContainer appointments={this.props.appointments} />
  );
  renderOneProblem = (routerProps) => {
    let problemId = parseInt(routerProps.match.params.id);
    let foundProblem = this.props.problems.filter(
      (problem) => problem.id === problemId
    );
    return foundProblem ? <OneProblem id={problemId} /> : <NotFound />;
  };
  archiveComments = (routerProps) => {
    let problemId = parseInt(routerProps.match.params.id);
    let foundProblem = this.props.problems.filter(
      (problem) => problem.id === problemId
    );
    return foundProblem ? <ArchiveComments id={problemId} /> : <NotFound />;
  };

  allAppointmentsForOneProblem = (routerProps) => {
    let problemId = parseInt(routerProps.match.params.id);
    let foundProblem = this.props.problems.filter(
      (problem) => problem.id === problemId
    );

    return foundProblem ? <ProblemAppointments id={problemId} /> : <NotFound />;
  };

  renderOneAppointment = (routerProps) => {
    let appID = parseInt(routerProps.match.params.id);
    let foundApp = this.props.appointments.filter(
      (appointment) => appointment.id === appID
    );
    return foundApp ? <OneAppointment /> : <NotFound />;
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
          <Route
            exact
            path="/problems/:id/archivenotes"
            render={(routerProps) => this.archiveComments(routerProps)}
          />{" "}
          <Route
            exact
            path="/problems/:id/appointments"
            render={(routerProps) =>
              this.allAppointmentsForOneProblem(routerProps)
            }
          />{" "}
          <Route
            exact
            path="/appointments/:id"
            render={(routerProps) => this.renderOneAppointment(routerProps)}
          />{" "}
          <Route path="/problems" component={this.renderAllProblem} />
          <Route path="/profile" component={this.renderProfilePage} />
          <Route path="/appointments" component={this.renderAllAppointments} />
          <Route path="/signin" component={this.renderLogin} />
          <Route path="/signup" component={this.renderSignup} />
          <Route path="/home" component={this.renderHome} />
          <Route
            path="/newproblem"
            component={() => this.renderNewProblem("btn-width-80")}
          />
          <Route path="/search" component={this.renderSearchResults} />
          <Route path="/" component={this.renderWelcomePage} />
        </Switch>
        {/* <NotificationContainer /> */}

        <Footer />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    problems: state.problems,
    appointments: state.appointments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setLogin: (user) => dispatch(setLogin(user)),
    setLogout: () => dispatch(setLogout()),
    setDoctors: (doctors) => dispatch(setDoctors(doctors)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
