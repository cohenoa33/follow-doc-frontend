import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { withRouter } from "react-router-dom";
import { addNewProblem } from "../actions";
import "reactjs-popup/dist/index.css";

class EditComment extends React.Component {
  state = {
    comment: {
      text: this.props.text,
      status_open: this.props.status_open,
    },
    blockInput: false,
  };

  handleChange = (e) => {
    this.setState({
      comment: {
        ...this.state.comment,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleStatusChange = (e) => {
    this.setState({
      comment: {
        ...this.state.comment,
        status_open: !this.props.status_open,
      },
    });
  };

  validate = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  render() {
    return (
      <Popup trigger={<button className="btn"> edit </button>} modal nested>
        {(close) => (
          <div className="modal">
            <button className="x-btn" onClick={close}>
              x
            </button>
            <div className="actions">
              <form
                noValidate
                onSubmit={(e) => {
                  this.validate(e);
                }}
              >
                <label>
                  {" "}
                  Status
                  <input
                    name="status_open"
                    type="checkbox"
                    checked={this.state.comment.status_open}
                    value={this.state.comment.status_open}
                    onClick={this.handleStatusChange}
                  />{" "}
                  open
                </label>
                <input
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.comment.text}
                  name="text"
                  placeholder={this.props.text}
                  noValidate
                ></input>
                <br />
                {this.state.blockInput ? null : (
                  <button className="btn">Save</button>
                )}
              </form>
              <button className="btn" onClick={close}>
                {" "}
                Close{" "}
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewProblem: (newProblem, e) => dispatch(addNewProblem(newProblem, e)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditComment));
