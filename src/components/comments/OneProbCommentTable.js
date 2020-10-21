import React from "react";
import { deleteComment } from "../../actions";
import { connect } from "react-redux";
import EditComment from "./EditComment";
import { withRouter } from "react-router-dom";
import moment from "moment";

class OneProbCommentsTable extends React.Component {
  handleDeleteComment = (e) => {
    let id = e.target.id;
    this.props.deleteComment(id);
  };
  renderEditComment = (id, text, status_open) => (
    <EditComment id={id} text={text} status_open={status_open} />
  );

  render() {
    return (
      <div>
        {this.props.comments.length > 0 ? (
          <div className="column-100">
            <table className="one-problem-comments-table">
              <tbody>
                <tr>
                  <th>Note</th>
                  <th>Last update</th>
                  <th>Create at</th>
                </tr>
                {this.props.comments.map((comment) => (
                  <tr key={comment.id}>
                    <td> {comment.text}</td>
                    <td> {moment(comment.updated_at).format("LLL")}</td>
                    <td> {moment(comment.created_at).format("LLL")}</td>
                    <td>
                      {this.renderEditComment(
                        comment.id,
                        comment.text,
                        comment.status_open
                      )}{" "}
                    </td>
                    <td>
                      <button
                        className="btn-delete"
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
        ) : null}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (id) => dispatch(deleteComment(id)),
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(OneProbCommentsTable));
