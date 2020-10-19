import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { editDependent } from "../../actions";
import "reactjs-popup/dist/index.css";

class EditDependents extends React.Component {
  state = {
    dependent: {
      id: this.props.id,
      name: this.props.name,
    },
    blockInput: false,
  };

  handleChange = (e) => {
    this.setState({
      ...this.state,
      dependent: {
        ...this.state.dependent,
        [e.target.name]: e.target.value,
      },
    });
  };

  validate = (e) => {
    this.setState({
      ...this.state,
      blockInput: true,
    });

    this.props.editDependent(this.state.dependent, e, this.props.id);
  };

  render() {
    return (
      <Popup
        trigger={<button className="comment-btn-edit"> x </button>}
        modal
        nested
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
                <input
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.dependent.name}
                  name="name"
                  placeholder={this.props.name}
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

const mapDispatchToProps = (dispatch) => {
  return {
    editDependent: (dependent, e, id) =>
      dispatch(editDependent(dependent, e, id)),
  };
};

export default connect(null, mapDispatchToProps)(EditDependents);
