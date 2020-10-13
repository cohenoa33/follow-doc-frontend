import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class CommentSearch extends React.Component {
  commentsList = () => {
    if (this.props.search.length > 0) {
      let search = this.props.search.toLowerCase();
      return this.props.comments.filter((comment) =>
        comment.text.toLowerCase().includes(search)
      );
    }
  };

  render() {
    return (
      <div className="search-results">
        <h3>Comments</h3>
        {this.props.search.length > 0 ? (
          <div>
            {this.commentsList().map((comment) => (
              <Link to={`/problems/${comment.problem_id}`}>
                <li key={comment.id}>{comment.text}</li>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    search: state.search,
  };
};

export default connect(mapStateToProps)(withRouter(CommentSearch));
