import React from "react";
import { deleteFile } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import api from "../../services/api";

class OneProbComments extends React.Component {
  handleDeleteFile = (problem, file) => {
    const problem_id = problem.id;
    // debugger;
    const index = problem.file.findIndex((f) => f == file);
    // console.log(index);
    this.props.deleteFile(problem_id, index);
    // api.problems
    //   .deleteFile(problem_id, index)
    //   .then((data) => console.log(data));
  };
  render() {
    let problem = this.props.id[0];
    console.log(problem);
    return (
      <div>
        <div className="one-problem-comments">
          <h1>File List</h1>
          {problem
            ? problem.file.map((file) => (
                <li className="x-btn" key={file.id}>
                  <a href={`http://localhost:3000/${file}`} target="_blank">
                    {file.name}
                  </a>
                  <button onClick={() => this.handleDeleteFile(problem, file)}>
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
    deleteFile: (problem_id, index) => dispatch(deleteFile(problem_id, index)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OneProbComments));
