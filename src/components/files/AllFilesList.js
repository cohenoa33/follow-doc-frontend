import React from "react";
import { deleteFile } from "../../actions";
import { connect } from "react-redux";
import { renderDeletePopup } from "../../services/helpers";

// const URL = `https://followdoc-api.herokuapp.com/`;
const URL = `http://localhost:3000/`;

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
        <h1 className="h1-title"> </h1>
        <div className="row-no-line">
          {problem
            ? problem.file.map((file) => (
                <div className="files-card" key={file.path}>
                  <a
                    id="file-link"
                    href={`${URL}${file.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name}

                    <img
                      id="file-display"
                      src={`${URL}${file.path}.preview`}
                      alt="file"
                    />
                  </a>
                  {renderDeletePopup(
                    () => this.handleDeleteFile(problem, file),
                    "btn-delete-center"
                  )}
                </div>
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
