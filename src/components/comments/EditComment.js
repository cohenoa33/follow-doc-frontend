import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { withRouter } from "react-router-dom";
import { editComment } from "../../actions";
import "reactjs-popup/dist/index.css";

class EditComment extends React.Component {
  state = {
    comment: {
      id: this.props.id,
      text: this.props.text,
      status_open: this.props.status_open,
    },
    blockInput: false,
  };

  handleChange = (e) => {
    const { status_open } = this.state.comment;
    let name = e.target.name;
    if (name === "status_open") {
      this.setState({
        ...this.state,
        comment: {
          ...this.state.comment,
          status_open: !status_open,
        },
      });
      if (name === "text") {
        this.setState({
          ...this.state,
          comment: {
            ...this.state.comment,
            text: e.target.value,
          },
        });
      }
    }
  };

  submitComment = (e) => {
    this.props
      .editComment(this.state.comment, e, this.props.id)
      .then((data) => {
        if (!data) {
          this.setState({ blockInput: true });
        }
      });
  };
  refreshState = () => {
    this.setState({ blockInput: false });
  };

  render() {
    return (
      <Popup
        trigger={<button className="comment-btn-edit"> x </button>}
        modal
        nested
        closeOnDocumentClick={false}
        onOpen={this.refreshState}
      >
        {(close) => (
          <div className="modal">
            <button className="x-btn" onClick={close}>
              x
            </button>
            <div className="actions">
              <form
                onSubmit={(e) => {
                  this.submitComment(e);
                }}
              >
                {!this.state.blockInput ? (
                  <div>
                    <label>
                      <input
                        name="status_open"
                        type="checkbox"
                        value={this.state.comment.status_open}
                        onChange={this.handleChange}
                      />{" "}
                      {this.props.status_open
                        ? "Mark as Closed"
                        : "Mark as Open"}
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

                    <button className="btn">Save</button>
                  </div>
                ) : (
                  <div className="">Comment Updated Successfully</div>
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
    editComment: (comment, e, id) => dispatch(editComment(comment, e, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditComment));
