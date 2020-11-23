import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authorized } from "../../services/helpers";
import { addFile } from "../../actions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import NewAppointment from "../appointments/NewAppointment";
import OneProbAllAppointments from "../../containers/OneProbAllAppointments";
import OpenAppointments from "../appointments/OpenAppointments";
import OneProblemInfo from "./OneProblemInfo";
import OneProbComments from "../comments/OneProbComments";
import AddNewComment from "../comments/AddNewComment";
// import UploadFiles from "../files/UploadFiles";
import AllFilesList from "../files/AllFilesList";
import NotFound from "../../components/NotFound";
import Dropzone from "../files/Dropzone";

toast.configure();
class OneProblem extends React.Component {
  componentDidMount() {
    authorized(this.props.history);
  }

  state = {
    uploading: false,
  };
  notify = (success) => {
    if (success) {
      toast("File uploaded Successfully", { autoClose: false });
    } else {
      toast.error("Failed to upload File, Please try again", {
        autoClose: false,
      });
    }
  };

  uploadFile = (formData) => {
    this.setState({ uploading: true });
    this.props.addFile(formData).then((data) => {
      if (!data) {
        this.setState({ uploading: false });
        this.notify("sucess");
      } else {
        this.setState({ uploading: false });
      }
    });
  };

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
  // renderUploadFiles = (id) => <UploadFiles id={id} />;
  renderFiles = (id) => <AllFilesList id={id} />;
  renderDropZone = (id) => <Dropzone id={id} uploadFile={this.uploadFile} />;

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
            {this.state.uploading ? (
              <p className="success-message">Uploading</p>
            ) : null}
            {this.renderDropZone(id)}
            {/* {this.renderUploadFiles(id)} */}
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
        <div>{this.renderFiles(problemArray, id)}</div>
        <br></br>
        <div className="row-no-line"></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    problems: state.problems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addFile: (problem) => dispatch(addFile(problem)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OneProblem));
