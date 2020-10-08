import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Comments extends React.Component {
  commentsList = () => {
    let comments = this.props.problems
      .map((problem) => problem.comments)
      .flat();
    return comments.filter((comment) => comment.status_open === true);
  };

  render() {
    console.log(this.props, "From Comments");
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
    problems: state.problems,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Comments);
