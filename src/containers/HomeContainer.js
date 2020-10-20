import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Problems from "../components/problems/ProblemsList";
import OpenComments from "../components/comments/OpenComments";
import NewDependent from "../components/user/NewDependent";
import NewProblem from "../components/problems/NewProblem";
import NewDoctor from "../components/doctors/NewDoctor";
import OpenAppointments from "../components/appointments/OpenAppointments";
import AllAppointments from "../components/appointments/AllAppointments";
import NewAppointment from "../components/appointments/NewAppointment";

class HomeContainer extends React.Component {
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    }
  }

  renderProblems = () => <Problems />;
  renderComments = () => <OpenComments />;
  renderAddNewDependent = () => <NewDependent />;
  renderAddNewProblem = () => <NewProblem />;
  renderOpenAppointments = () => <OpenAppointments />;
  renderAllAppointments = () => <AllAppointments />;
  renderNewAppointment = () => <NewAppointment />;
  renderAddNewDoctor = () => <NewDoctor />;

  render() {
    return (
      <div>
        <div className="row">
          <div className="column-30">{this.renderOpenAppointments()} </div>
          <div className="column-30">
            <div> {this.renderAddNewDependent()}</div>
            <div> {this.renderAddNewProblem()}</div>
            <div> {this.renderAddNewDoctor()}</div>
            <div> {this.renderNewAppointment()}</div>
          </div>
          <div className="column-30"> {this.renderComments()}</div>
          <br></br>
        </div>
        <div className="row">
          <div className="column-100">{this.renderProblems()} </div>
        </div>

        <div className="column-100">{this.renderAllAppointments()} </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    problems: state.user.problems,
    dependents: state.dependents,
  };
};

export default connect(mapStateToProps)(withRouter(HomeContainer));
