import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { addDependent } from "../../actions";
import { withRouter } from "react-router-dom";

class NewDependent extends React.Component {
  state = {
    newDependent: "",
    blockInput: false,
  };

  handleChange = (e) => {
    this.setState({ newDependent: e.target.value });
  };

  handleSubmit = (e) => {
    let userID = this.props.id;
    this.props.addDependent(e, this.state.newDependent, userID).then((data) => {
      if (!data) {
        this.setState({ blockInput: true });
      }
    });
  };
  refreshState = () => {
    this.setState({
      newDependent: "",
      blockInput: false,
    });
  };

  render() {
    return (
      <Popup
        trigger={<button className="btn"> Add Dependent </button>}
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
            <div className="success-message">
              {this.state.blockInput ? "Added Dependent Successfully" : null}{" "}
              <br />
            </div>
            <div className="actions">
              <form onSubmit={this.handleSubmit}>
                <br />
                <label className="form-title">Add Dependent</label>
                <br />
                {this.state.blockInput ? (
                  <input
                    name="name"
                    type="text"
                    placeholder="Dependent Name"
                    disabled
                  />
                ) : (
                  <input
                    onChange={this.handleChange}
                    name="name"
                    type="text"
                    placeholder="Dependent Name"
                    required
                  />
                )}
                {this.state.blockInput ? null : (
                  <button className="btn" type="submit">
                    Add Dependent
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
    addDependent: (e, newDependent, userID) =>
      dispatch(addDependent(e, newDependent, userID)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewDependent));
