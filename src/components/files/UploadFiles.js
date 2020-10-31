import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { addFile } from "../../actions";
import Dropzone from "react-dropzone";

class UploadFiles extends React.Component {
  state = {
    newFile: null,
    uploaded: false,
    uploading: false,
  };
  handleFileChange = (e) => {
    let file = e.target.files[0];
    console.log(file);
    if (file) {
      this.setState({ newFile: file });
    }
  };
  uploadFile = (e) => {
    e.preventDefault();
    this.setState({ uploading: true });
    const formData = new FormData();
    formData.append("file", this.state.newFile);
    formData.append("fileName", this.state.newFile);
    formData.append("problem_id", this.props.id);

    this.props.addFile(formData).then((data) => {
      if (!data) {
        this.setState({ uploaded: true });
      }
    });
  };

  refreshState = () => {
    this.setState({
      newFile: null,
      uploaded: false,
      uploading: false,
    });
  };

  render() {
    return (
      <Popup
        trigger={<button className="btn-width-80"> Upload File</button>}
        modal
        nested
        closeOnDocumentClick={false}
        onOpen={this.refreshState}
      >
        {(close) => (
          <div className="modal">
            {!this.state.uploaded ? (
              <div>
                <button className="back-btn" onClick={close}>
                  back
                </button>
                <form
                  // enctype="multipart/form-data"
                  method="post"
                  // name="fileinfo"
                  className="popup-form"
                  onSubmit={this.uploadFile}
                >
                  <input
                    className="upload-file"
                    type="file"
                    // name="newFile"
                    onChange={this.handleFileChange}
                  />

                  <br></br>
                </form>
                <div>
                  <button className="btn" onClick={this.uploadFile}>
                    {this.state.uploading ? "Uploading File..." : "Upload"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="success-message">
                File uploaded Successfully
                <br />
                <button className="back-btn" onClick={close}>
                  back{" "}
                </button>
              </div>
            )}
          </div>
        )}
      </Popup>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addFile: (problem) => dispatch(addFile(problem)),
  };
};

export default connect(null, mapDispatchToProps)(UploadFiles);
