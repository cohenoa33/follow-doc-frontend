import React from "react";
import { deleteComment } from "../../actions";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import OneProbCommentsTable from "./OneProbCommentTable";

class OneProbComments extends React.Component {
  renderOneProbCommentsTable = (comments) => (
    <OneProbCommentsTable comments={comments} />
  );

  render() {
    const id = this.props.match.params.id;

    const openComments = this.props.comments.filter(
      (comment) => comment.problem_id === +id && comment.status_open === true
    );

    return (
      <div>
        {openComments.length > 0 ? (
          <div>
            <h1 className="h1-title">Todo List</h1>
            {this.renderOneProbCommentsTable(openComments)}
          </div>
        ) : (
          <h1 className="h1-title">Todo List is Empty</h1>
        )}
        <Link to={`/problems/${id}/archivenotes`}>
          {" "}
          <button className="btn"> Archive Notes </button>{" "}
        </Link>
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
