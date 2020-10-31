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
        <h1 className="h1-title"> Files: </h1>
        <div className="row-no-line">
          {problem
            ? problem.file.map((file) => (
                <div className="files-card" key={file.path}>
                  <a
                    href={`http://localhost:3000/${file.path}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {file.name}

                    <img
                      width="100px"
                      src={`http://localhost:3000/${file.path}.preview`}
                      alt="file"
                      style={{
                        margin: 10,
                        width: 200,
                        height: 100,
                        border: "1px solid grey",
                      }}
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
