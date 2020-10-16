import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { addNewDependent } from "../../actions";

class NewDependent extends React.Component {
  state = {
    newDependent: "",
    blockInput: false,
  };

  handleChange = (e) => {
    this.setState({ newDependent: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    let userID = this.props.id;
    this.props.addNewDependent(this.state.newDependent, userID);
    this.setState({ blockInput: true });
  };

  render() {
    return (
      <Popup
        trigger={<button className="btn"> Add Dependent </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="x-btn" onClick={close}>
              x
            </button>
            <div className="header"> </div>
            <div className="content"> </div>
            <div className="actions">
              <form onSubmit={this.handleSubmit}>
                <label>Dependent Name</label>
                {this.state.blockInput ? (
                  <input
                    name="name"
                    type="text"
                    placeholder="New Dependent Name"
                    disabled
                  />
                ) : (
                  <input
                    onChange={this.handleChange}
                    name="name"
                    type="text"
                    placeholder="New Dependent Name"
                  />
                )}
                {this.state.blockInput ? null : (
                  <button className="btn" type="submit">
                    Add new Dependent
                  </button>
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
    id: state.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewDependent: (newDependent, userID, e) =>
      dispatch(addNewDependent(newDependent, userID, e)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewDependent);
