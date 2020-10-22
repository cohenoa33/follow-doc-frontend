import React from "react";
import OneProbCommentsTable from "./OneProbCommentTable";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

class ArchiveComments extends React.Component {
  renderOneProbCommentsTable = (comments, name) => (
    <OneProbCommentsTable comments={comments} name={name} />
  );
  render() {
    const id = this.props.match.params.id;
    const problemName = this.props.problems
      .filter((problem) => problem.id === +id)
      .map((problem) => problem.name);
    const closeComments = this.props.comments.filter(
      (comment) => comment.problem_id === +id && comment.status_open === false
    );
    return (
      <div>
        <Link to={`/problems/${id}`}>
          <button className="back-btn">back</button>
        </Link>
        <h1 className="h1-title">
          Archive Notes {problemName.length > 0 ? `for ${problemName}` : null}{" "}
        </h1>
        {this.renderOneProbCommentsTable(closeComments, problemName)}
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

export default connect(mapStateToProps)(withRouter(ArchiveComments));
