import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import NewAppointment from "./appointments/NewAppointment";
import OneProbAllAppointments from "./appointments/OneProbAllAppointments";
import OpenAppointments from "./appointments/OpenAppointments";
import OneProbProblemInfo from "./problems/OneProbProblemInfo";
import OneProbComments from "./comments/OneProbComments";
import AddNewComment from "./comments/AddNewComment";

class OneProblem extends React.Component {
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    }
  }

  renderAllAppointments = (id) => <OneProbAllAppointments id={id} />;
  renderOpenAppointments = (id) => <OpenAppointments id={id} />;
  renderOneProbProblemInfo = (problem) => (
    <OneProbProblemInfo problem={problem} />
  );
  renderNewAppointment = (id) => <NewAppointment id={id} />;
  renderAddNewComment = (id) => <AddNewComment id={id} />;
  renderOneProbComments = () => <OneProbComments />;

  render() {
    const id = this.props.id;
    let problem = this.props.problems.filter((problem) => problem.id === id);
    return (
      <div>
        <div>
          {this.renderOneProbProblemInfo(problem)}
          <div className="column-30"> {this.renderOpenAppointments(id)} </div>
          <div className="problem-container-buttons">
            <button className="btn-problem-container-buttons">
              Upload File
            </button>
            {this.renderNewAppointment(id)}
            {this.renderAddNewComment(id)}
          </div>
        </div>
        <br />
        <div>{this.renderOneProbComments()}</div>
        <div>{this.renderAllAppointments(id)}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    problems: state.problems,
  };
};

export default connect(mapStateToProps)(withRouter(OneProblem));
