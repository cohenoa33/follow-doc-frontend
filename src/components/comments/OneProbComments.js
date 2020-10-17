import React from "react";
import { deleteComment } from "../../actions";
import { connect } from "react-redux";
import EditComment from "./EditComment";
import { withRouter } from "react-router-dom";

class OneProbComments extends React.Component {
  handleDeleteComment = (e) => {
    let id = e.target.id;
    this.props.deleteComment(id);
  };
  renderEditComment = (id, text, status_open) => (
    <EditComment id={id} text={text} status_open={status_open} />
  );

  render() {
    const id = this.props.match.params.id;
    const comments = this.props.comments.filter(
      (comment) => comment.problem_id === +id
    );

    return (
      <div>
        <div className="one-problem-comments">
          <table className="one-problem-comments-table">
            <tbody>
              <tr>
                <th>Comment </th>
                <th>Last update</th>
                <th>Create at</th>
                <th>Status</th>
              </tr>
              {comments.map((comment) => (
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
                      className="x-btn-delete"
                      id={comment.id}
                      onClick={this.handleDeleteComment}
                    >
                      X
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
    comments: state.comments,
    problems: state.problems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (id) => dispatch(deleteComment(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OneProbComments));
