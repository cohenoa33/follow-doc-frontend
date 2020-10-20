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
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        [e.target.name]: e.target.value,
      },
    });
  };
  handleStatusChange = (e) => {
    this.setState({
      ...this.state,
      comment: {
        ...this.state.comment,
        status_open: !this.state.status_open,
      },
    });
  };

  validate = (e) => {
    this.props
      .editComment(this.state.comment, e, this.props.id)
      .then((data) => {
        if (!data) {
          this.setState({ blockInput: true });
        }
      });
  };
  refreshState = () => {
    this.setState({
      comment: {
        id: this.props.id,
        text: this.props.text,
        status_open: this.props.status_open,
      },
      blockInput: false,
    });
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
                noValidate
                onSubmit={(e) => {
                  this.validate(e);
                }}
              >
                <label>
                  {" "}
                  <input
                    name="status_open"
                    type="checkbox"
                    checked={this.state.comment.status_open}
                    value={this.state.comment.status_open}
                    onClick={this.handleStatusChange}
                  />{" "}
                  Mark as Open
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
    editComment: (comment, e, id) => dispatch(editComment(comment, e, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditComment));
