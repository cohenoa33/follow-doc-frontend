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
        trigger={
          <button className={this.props.className}> Add Dependent </button>
        }
        modal
        nested
        closeOnDocumentClick={false}
        onOpen={this.refreshState}
      >
        {(close) => (
          <div className="modal">
            <button className="back-btn" onClick={close}>
              back
            </button>
            {this.state.blockInput ? (
              <div className="success-message">
                Added Dependent Successfully
              </div>
            ) : null}
            <div className="actions">
              <form onSubmit={this.handleSubmit}>
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
                  <button className="btn-width-80" type="submit">
                    Add Dependent
                  </button>
                )}
              </form>
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
