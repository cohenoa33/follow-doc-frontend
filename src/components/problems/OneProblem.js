import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authorized } from "../../services/helpers";

import NewAppointment from "../appointments/NewAppointment";
import OneProbAllAppointments from "../../containers/OneProbAllAppointments";
import OpenAppointments from "../appointments/OpenAppointments";
import OneProblemInfo from "./OneProblemInfo";
import OneProbComments from "../comments/OneProbComments";
import AddNewComment from "../comments/AddNewComment";
import UploadFiles from "../files/UploadFiles";
import AllFilesList from "../files/AllFilesList";
import NotFound from "../../components/NotFound";

class OneProblem extends React.Component {
  componentDidMount() {
    authorized(this.props.history);
  }

  renderAllAppointments = (id) => <OneProbAllAppointments id={id} />;
  renderOpenAppointments = (id) => <OpenAppointments id={id} />;
  renderOneProblemInfo = (problems, id) => {
    let problem = problems.find((p) => p.id === id);
    return problem ? (
      <OneProblemInfo id={id} problem={problem} />
    ) : (
      <NotFound />
    );
  };

  renderNewAppointment = (id) => <NewAppointment id={id} />;
  renderAddNewComment = (id) => <AddNewComment id={id} />;
  renderOneProbComments = () => <OneProbComments />;
  renderUploadFiles = (id) => <UploadFiles id={id} />;
  renderFiles = (id) => <AllFilesList id={id} />;

  render() {
    const id = this.props.id;
    let problemArray = this.props.problems.filter(
      (problem) => problem.id === id
    );
    let problem = problemArray.find((problems) => problems);

    return (
      <div>
        <div className="row">
          <h1 className="h1-title">
            {problem ? `${problem.name} for ${problem.dependent.name}` : null}{" "}
          </h1>
          {this.renderOneProblemInfo(problemArray, id)}
          <div className="problem-container-buttons">
            {this.renderUploadFiles(id)}
            {this.renderNewAppointment(id)}
            {this.renderAddNewComment(id)}
          </div>
        </div>
        <div className="row">
          <div>{this.renderOneProbComments()}</div>
        </div>
        <div className="row">
          <div> {this.renderOpenAppointments(id)} </div>
        </div>
        <div>{this.renderAllAppointments(id)}</div>
        <div>{this.renderFiles(problemArray)}</div>
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
