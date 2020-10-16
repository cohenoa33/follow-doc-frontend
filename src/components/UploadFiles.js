import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import api from "../services/api";

class UploadFiles extends React.Component {
  state = {
    newFile: null,
  };
  handleFileChange = (e) => {
    let file = e.target.files[0];
    if (file) {
      this.setState({ newFile: file });
    }
  };

  uploadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.newFile);
    formData.append("problem_id", this.props.id);
    api.problems.addFile(formData).then((data) => console.log(data));
  };
  render() {
    console.log(this.state);
    console.log(this.props.id);
    return (
      <Popup
        trigger={<button className="btn"> Upload File</button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
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
        )}
      </Popup>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     addDoctor: (doctor, e) => dispatch(addDoctor(doctor, e)),
//   };
// };

// export default connect(null, mapDispatchToProps)(UploadFiles);
export default UploadFiles;
