import React from "react";
import { deleteComment } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class OneProbComments extends React.Component {
  render() {
    let problem = this.props.id[0];
    return (
      <div>
        <div className="one-problem-comments">
          <h1>File List</h1>
          {problem
            ? problem.file.map((file) => (
                <li className="x-btn" key={file.id}>
                  <a href={`http://localhost:3000/${file}`} target="_blank">
                    File
                  </a>
                  <button id={file.id} onClick={this.handleDeleteComme} t>
                    x
                  </button>
                </li>
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    //     // comments: state.comments,
    //     problems: state.problems,
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
