import React from "react";
import { connect } from "react-redux";
import "./App.css";
import axios from "axios";

import LoginForm from "./components/LoginForm";
class App extends React.Component {
  state = {
    selectedFile: null,
    user: {},
  };
  handleLoginSubmit = (event, user) => {
    event.preventDefault();
    this.setState({ user: user });
  };

  handleFileSelect = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  handleUploadFile = () => {
    if (this.state.selectedFile) {
      const fd = new FormData();
      fd.append("doc", this.state.selectedFile, this.state.selectedFile.name);
      axios
        .post("link to the library", fd, {
          onUploadProgress: (progressEvent) => {
            console.log(
              "upload progress: " +
                (progressEvent.loaded / progressEvent.total) * 100 +
                "%"
            );
          },
        })
        .then((res) => {
          console.log(res);
        });

      console.log(fd);
    }
  };
  handleOnClick() {
    this.props.dispatch({
      type: "INCREASE_COUNT",
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.user.length > 0
          ? `Hello${this.state.user.username}`
          : "Not loged in "}
        <button onClick={() => this.handleOnClick()}>Click</button>
        <p>{this.props.items.length}</p>

        <br />
        <input
          style={{ display: "none" }}
          type="file"
          onChange={this.handleFileSelect}
          ref={(fileInput) => (this.fileInput = fileInput)}
        />
        <button onClick={() => this.fileInput.click()}>Pick file</button>
        <button onClick={this.handleUploadFile}> submit </button>
        <LoginForm login={this.handleLoginSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { items: state.items };
};

export default connect(mapStateToProps)(App);
