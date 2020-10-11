import React from "react";
import api from "../services/api";
import { withRouter } from "react-router-dom";
import { deleteComment, addNewComment } from "../actions";
import { connect } from "react-redux";
import EditComment from "./EditComment";

class OneProblem extends React.Component {
  state = {
    newComment: {
      text: "",
      status_open: false,
    },
  };
  // componentDidMount() {
  //   // if (!localStorage.token) {
  //   //   this.props.history.push("/");
  //   // }
  // }

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
    let id = this.props.slug.match.params.id;
    this.props.addNewComment(newComment, e, id);
  };

  handleDeleteComment = (e) => {
    debugger;
    let id = +e.target.id;
    this.props.deleteComment(id);
  };

  renderEditComment = (id, text, status_open) => (
    <EditComment id={id} text={text} status_open={status_open} />
  );

  render() {
    const problem = this.props.problems.filter(
      (p) => p.id == this.props.slug.match.params.id
    );

    return (
      <div>
        <div>
          <div className="problem-container-description">
            <button className="btn-x">Edit</button>
            <br />
            <br />
            <span> {problem[0].dependent.name}</span>
            <h1>{problem[0].name}</h1>
            <div>{problem[0].description} </div>
          </div>
          <div className="problem-container-appointments">Appointments</div>
          <div className="problem-container-buttons">
            <button className="btn">Upload File</button>
            <button className="btn">Add New Appointment</button>
            <form onSubmit={(e) => this.updateOneProblemPage(e)}>
              <label>
                {" "}
                Status
                <input
                  name="status_open"
                  type="checkbox"
                  value={this.state.newComment.status_open}
                  onChange={this.handleInputChange}
                />{" "}
                open
              </label>
              <input
                type="text"
                placeholder="Add New Comment"
                name="text"
                value={this.state.newComment.text}
                onChange={this.handleInput}
              />
              <button className="btn">Add New Comment</button>
            </form>
          </div>
        </div>
        <br />
        <div className="one-problem-comments">
          <table className="one-problem-comments-table">
            <thead>
              <div> Comments</div>
            </thead>
            <tbody>
              {problem[0].comments.map((comment) => (
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
                    {/* <button
                      className="btn-x"
                      id={comment.id}
                      onClick={this.handleEditComment}
                    >
                      Edit
                    </button> */}
                  </td>
                  <td>
                    {" "}
                    <button
                      className="x-btn"
                      id={comment.id}
                      onClick={this.handleDeleteComment}
                    >
                      {" "}
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
