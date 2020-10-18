import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { updateFile } from "../../actions";

class UploadFiles extends React.Component {
  state = {
    newFile: null,
    isUploading: false,
  };
  handleFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      this.setState({ newFile: file });
    }
  };
  uploadFile = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, isUploading: !this.state.isUploading });
    const formData = new FormData();
    formData.append("file", this.state.newFile);
    formData.append("fileName", this.state.newFile);
    formData.append("problem_id", this.props.id);

    this.props.updateFile(formData);
  };

  render() {
    return (
      <Popup
        trigger={<button className="btn"> Upload File</button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            {!this.state.isUploading ? (
              <div>
                <button className="x-btn" onClick={close}>
                  x
                </button>
                <br></br>
                <br></br>

                <form
                  enctype="multipart/form-data"
                  method="post"
                  name="fileinfo"
                  className="popup-form"
                  onSubmit={this.uploadFile}
                >
                  <input
                    type="file"
                    name="newFile"
                    onChange={this.handleFileChange}
                  />
                  <button className="btn" onClick={this.uploadFile}>
                    Upload
                  </button>

                  <br></br>
                </form>
              </div>
            ) : (
              <button className="btn" onClick={close}>
                File Uploaded{" "}
              </button>
            )}
          </div>
        )}
      </Popup>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateFile: (problem) => dispatch(updateFile(problem)),
  };
};

export default connect(null, mapDispatchToProps)(UploadFiles);