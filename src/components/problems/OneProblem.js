import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import NewAppointment from "../appointments/NewAppointment";
import OneProbAllAppointments from "../appointments/OneProbAllAppointments";
import OpenAppointments from "../appointments/OpenAppointments";
import OneProbProblemInfo from "./OneProbProblemInfo";
import OneProbComments from "../comments/OneProbComments";
import AddNewComment from "../comments/AddNewComment";
import UploadFiles from "../files/UploadFiles";
import AllFilesList from "../files/AllFilesList";

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
  renderUploadFiles = (id) => <UploadFiles id={id} />;
  renderFiles = (id) => <AllFilesList id={id} />;

  render() {
    const id = this.props.id;
    let problem = this.props.problems.filter((problem) => problem.id === id);
    // let prob = this.props.problems.find((problem) => problem.id === id);
    console.log(this.props.problems);

    return (
      <div>
        <div>
          {this.renderOneProbProblemInfo(problem)}
          <div className="column-30"> {this.renderOpenAppointments(id)} </div>
          <div className="problem-container-buttons">
            {this.renderUploadFiles(id)}
            {this.renderNewAppointment(id)}
            {this.renderAddNewComment(id)}
          </div>
        </div>
        <br />
        <div>{this.renderOneProbComments()}</div>
        <div>{this.renderAllAppointments(id)}</div>
        <div>{this.renderFiles(problem)}</div>
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
