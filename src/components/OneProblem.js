import React from "react";
import api from "../services/api";
import { withRouter } from "react-router-dom";
import { deleteComment, addNewComment } from "../actions";
import { connect } from "react-redux";
import EditComment from "./comments/EditComment";

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

      api.auth.oneProblem(id).then((data) =>
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

  handleDeleteComment = (e) => {
    let id = e.target.id;
    const list = this.state.comments.filter(
      (comment) => comment.id !== parseInt(id)
    );
    this.setState({ ...this.state, comments: list });
    this.props.deleteComment(id);
  };
  renderEditComment = (id, text, status_open) => (
    <EditComment id={id} text={text} status_open={status_open} />
  );

  render() {
    const { name, description } = this.state.problem;
    return (
      <div>
        <div>
          <div className="problem-container-description">
            <br />
            <span> Dependent: </span>
            <span> {this.state.dependent.name}</span>
            <h1>{name}</h1>
            Description:
            <div>{description} </div>
          </div>
          <div className="problem-container-appointments">Appointments</div>
          <div className="problem-container-buttons">
            <button className="btn-problem-container-buttons">
              Upload File
            </button>
            <button className="btn-problem-container-buttons">
              Add New Appointment
            </button>
            <form onSubmit={(e) => this.updateOneProblemPage(e)}>
              <label>
                {" "}
                <input
                  name="status_open"
                  type="checkbox"
                  value={this.state.newComment.status_open}
                  onChange={this.handleInputChange}
                />{" "}
                Mark as Open
              </label>
              <input
                type="text"
                placeholder="Add New Comment"
                name="text"
                value={this.state.newComment.text}
                onChange={this.handleInput}
              />
              <button className="btn-problem-container-buttons">
                Add New Comment
              </button>
            </form>
          </div>
        </div>
        <br />
        <div className="one-problem-comments">
          <table className="one-problem-comments-table">
            <h1 className="one-problem-comments-title"> Comments</h1>
            <thead></thead>
            <tbody>
              <tr>
                <th>Text </th>
                <th>Updated Date</th>
                <th>Created Date</th>
                <th>Status</th>
              </tr>
              {this.state.comments.map((comment) => (
                <tr key={comment.id}>
                  <td> {comment.text}</td>
                  <td> {comment.updated_at}</td>
                  <td> {comment.created_at}</td>
                  <td> {comment.status_open ? "Open" : "Closed"}</td>
                  <td>
                    {this.renderEditComment(
                      comment.id,
                      comment.text,
                      comment.status_open
                    )}{" "}
                  </td>
                  <td>
                    <button
                      className="x-btn"
                      id={comment.id}
                      onClick={this.handleDeleteComment}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    addNewComment: (newComment, e, id) =>
      dispatch(addNewComment(newComment, e, id)),
    deleteComment: (id) => dispatch(deleteComment(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OneProblem));
