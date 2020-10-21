import React from "react";
import { deleteComment } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OneProbCommentsTable from "./OneProbCommentTable";
import ArchiveComments from "./ArchiveComments";

class OneProbComments extends React.Component {
  renderOneProbCommentsTable = (comments) => (
    <OneProbCommentsTable comments={comments} />
  );
  renderArchiveComments = (comments) => <ArchiveComments comments={comments} />;

  render() {
    const id = this.props.match.params.id;

    const openComments = this.props.comments.filter(
      (comment) => comment.problem_id === +id && comment.status_open === true
    );
    const closeComments = this.props.comments.filter(
      (comment) => comment.problem_id === +id && comment.status_open === false
    );

    return (
      <div>
        {openComments.length > 0 ? (
          <div>
            <h1 className="h1-title">Todo List</h1>
            {this.renderOneProbCommentsTable(openComments)}
          </div>
        ) : null}

        {this.renderArchiveComments(closeComments)}
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
