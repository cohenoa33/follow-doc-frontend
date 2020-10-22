import React from "react";
import { deleteFile } from "../../actions";
import { connect } from "react-redux";
import { renderDeletePopup } from "../../services/helpers";

class AllFilesList extends React.Component {
  handleDeleteFile = (problem, file) => {
    const problem_id = problem.id;
    const index = problem.file.findIndex((f) => f === file);
    this.props.deleteFile(problem_id, index);
  };

  render() {
    let problem = this.props.id[0];
    return (
      <div>
        <div className="one-problem-comments">
          {problem
            ? problem.file.map((file) => (
                <li className="files-list" key={file.name}>
                  <a
                    href={`http://localhost:3000/${file.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name}
                  </a>
                  {renderDeletePopup(
                    () => this.handleDeleteFile(problem, file),
                    "btn-delete"
                  )}
                </li>
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFile: (problem_id, index) => dispatch(deleteFile(problem_id, index)),
  };
};

export default connect(null, mapDispatchToProps)(AllFilesList);
