import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { addNewDependent } from "../actions";

class Dependent extends React.Component {
  state = {
    newDependent: "",
  };

  handleChange = (e) => {
    this.setState({ newDependent: e.target.value });
  };

  render() {
    let userID = this.props.id;

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
            <div className="header"> Please Enter a New Dependent Name </div>
            <div className="content"> </div>
            <div className="actions">
              <label> Name</label>
              <input
                onChange={this.handleChange}
                name="name"
                type="text"
                placeholder="New Dependent Name"
              />
              <button
                className="btn"
                onClick={() => {
                  setTimeout(() => close(), 1000);
                  this.props.addNewDependent(this.state.newDependent, userID);
                }}
              >
                {" "}
                Save{" "}
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
    addNewDependent: (newDependent, userID) =>
      dispatch(addNewDependent(newDependent, userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dependent);
