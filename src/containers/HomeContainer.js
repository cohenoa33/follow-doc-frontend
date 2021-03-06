import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { authorized, sortByAsc, futureAppointments } from "../services/helpers";

import OpenComments from "../components/comments/OpenComments";
import NewProblem from "../components/problems/NewProblem";
import NewDoctor from "../components/doctors/NewDoctor";
import OpenAppointments from "../components/appointments/OpenAppointments";
import FullTableAppointments from "../components/appointments/FullTableAppointments";
import NewAppointment from "../components/appointments/NewAppointment";

class HomeContainer extends React.Component {
  componentDidMount() {
    authorized(this.props.history);
  }

  renderComments = () => <OpenComments />;
  renderAddNewProblem = (className) => <NewProblem className={className} />;
  renderOpenAppointments = () => <OpenAppointments />;
  renderAllOpenAppointments = () => (
    <FullTableAppointments
      appointments={sortByAsc(futureAppointments(this.props.appointments))}
    />
  );
  renderNewAppointment = () => <NewAppointment />;
  renderAddNewDoctor = (className) => <NewDoctor className={className} />;

  render() {
    return (
      <div>
        <div className="row">
          <div className="column-30">{this.renderOpenAppointments()} </div>
          <div className="column-30">
            <div> {this.renderAddNewProblem("btn-width-80")}</div>
            <div> {this.renderNewAppointment()}</div>
            <div> {this.renderAddNewDoctor("btn-width-80")}</div>
          </div>
          <div className="column-30"> {this.renderComments()}</div>
          <br></br>
        </div>
        <h1 className="h1-title">Next Appointments </h1>
        <div className="column-100">{this.renderAllOpenAppointments()} </div>
        {/* <div className="row">
          <div className="column-100">{this.renderProblems()} </div>
        </div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    problems: state.user.problems,
    dependents: state.dependents,
    appointments: state.appointments,
  };
};

export default connect(mapStateToProps)(withRouter(HomeContainer));
