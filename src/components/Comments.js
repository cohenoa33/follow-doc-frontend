import React from "react";
import { connect } from "react-redux";

class Comments extends React.Component {
  commentsList = () => {
    let comments = this.props.comments;
    return comments.filter((comment) => comment.status_open === true);
  };

  render() {
    return (
      <div>
        <h1> Comments</h1>
        {this.commentsList().map((comment) => (
          <li key={comment.id}>
            {" "}
            {comment.text} {comment.created_at.toString()}{" "}
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

export default connect(mapStateToProps)(Comments);
