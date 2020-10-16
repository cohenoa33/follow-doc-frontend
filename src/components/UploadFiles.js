import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

class UploadFiles extends React.Component {
  state = {
    newFile: null,
    url: "",
  };
  handleFileChange = (e) => {
    if (e.target.files[0]) {
      this.setState({ newFile: e.target.files[0] });
    }
    console.log(this.state);
  };

  uploadFile = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.newFile);
    console.log("Hello");
  };
  render() {
    console.log(this.state);
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
            <form className="popup-form" onSubmit={this.uploadFile}>
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
