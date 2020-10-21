import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class OpenComments extends React.Component {
  commentsList = () => {
    let comments = this.props.comments;
    return comments.filter((comment) => comment.status_open === true);
  };

  render() {
    return (
      <div className="open-comments-appointments">
        <div className="h1-title">
          <h1>Todo List</h1>
        </div>
        {this.commentsList().map((comment) => (
          <li key={comment.id}>
            {" "}
            <Link to={`/problems/${comment.problem_id}`}>
              {comment.text}
              <br></br>
            </Link>
          </li>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    user: state.user,
  };
};

export default connect(mapStateToProps)(OpenComments);
