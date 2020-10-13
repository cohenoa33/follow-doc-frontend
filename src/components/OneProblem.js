import React from "react";
import api from "../services/api";
import { withRouter } from "react-router-dom";
import { deleteComment, addNewComment } from "../actions";
import { connect } from "react-redux";

import NewAppointment from "./appointments/NewAppointment";
import OneProbAllAppointments from "./appointments/OneProbAllAppointments";
import OpenAppointments from "./appointments/OpenAppointments";
import OneProbProblemInfo from "./problems/OneProbProblemInfo";
import OneProbComments from "./comments/OneProbComments";
import AddNewComment from "./comments/AddNewComment";

class OneProblem extends React.Component {
  state = {
    problem: {},
    dependent: {},
    comments: [],
    newComment: {
      text: "",
      status_open: false,
    },
  };
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    } else {
      let id = this.props.id;

      api.problems.oneProblem(id).then((data) =>
        this.setState({
          problem: data,
          dependent: data.dependent,
          comments: data.comments,
        })
      );
    }
  }

  handleInputChange = () => {
    this.setState({
      ...this.state,
      newComment: {
        ...this.state.newComment,
        status_open: !this.state.newComment.status_open,
      },
    });
  };
  handleInput = (e) => {
    this.setState({
      ...this.state,
      newComment: {
        ...this.state.newComment,
        text: e.target.value,
      },
    });
  };

  updateOneProblemPage = (e) => {
    const { problem, newComment, comments } = this.state;
    e.preventDefault();
    let today = Date.now();
    let time = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(today);

    this.setState({
      ...this.state,
      comments: [
        ...comments,
        {
          created_at: time,
          id: 0,
          problem_id: problem.id,
          status_open: newComment.status_open,
          text: newComment.text,
          updated_at: time,
        },
      ],
    });

    this.props.addNewComment(newComment, e, problem.id);
  };

  renderAllAppointments = (id) => <OneProbAllAppointments id={id} />;
  renderOpenAppointments = (id) => <OpenAppointments id={id} />;
  renderOneProbProblemInfo = () => (
    <OneProbProblemInfo
      name={this.state.problem.name}
      description={this.state.problem.description}
      dependent={this.state.dependent.name}
    />
  );
  renderNewAppointment = (id) => <NewAppointment id={id} />;
  renderAddNewComment = (id) => <AddNewComment id={id} />;
  renderOneProbComments = () => <OneProbComments />;

  render() {
    const id = this.props.id;
    return (
      <div>
        <div>
          {this.renderOneProbProblemInfo()}
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
    user: state.user,
    problem: state.problems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewComment: (newComment, e, id) =>
      dispatch(addNewComment(newComment, e, id)),
    deleteComment: (id) => dispatch(deleteComment(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OneProblem));
