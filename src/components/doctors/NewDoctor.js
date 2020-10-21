import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { addDoctor } from "../../actions";

class NewDoctor extends React.Component {
  state = {
    doctor: {
      name: "",
      street: "",
      city: "",
      state: "",
      zipcode: "",
    },
    blockInput: false,
  };

  handleChange = (e) => {
    this.setState({
      doctor: {
        ...this.state.doctor,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleAddDoctor = (e) => {
    this.props.addDoctor(this.state.doctor, e).then((data) => {
      if (!data) {
        this.setState({ blockInput: true });
      }
    });
  };
  refreshState = () => {
    this.setState({
      doctor: {
        name: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
      },
      blockInput: false,
    });
  };

  render() {
    return (
      <Popup
        trigger={<button className="btn-width-90">Add Doctor </button>}
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
            <div className="success-message">
              {this.state.blockInput ? "Added Doctor Successfully" : null}{" "}
            </div>{" "}
            <form
              className="popup-form"
              onSubmit={(e) => {
                this.handleAddDoctor(e);
              }}
            >
              <div className="form-title">Add New Doctor</div>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.name}
                name="name"
                placeholder="Doctor Name"
                required
              ></input>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.street}
                name="street"
                placeholder="Street"
                required
              ></input>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.city}
                name="city"
                placeholder="City"
                required
              ></input>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.state}
                name="state"
                placeholder="State"
                required
              ></input>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.zipcode}
                name="zipcode"
                placeholder="Zipcode"
              ></input>
              <br />
              {this.state.blockInput ? (
                <button className="btn" onClick={close}>
                  {" "}
                  Close{" "}
                </button>
              ) : (
                <button className="btn-width-90">Add new Doctor</button>
              )}
            </form>
          </div>
        )}
      </Popup>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addDoctor: (doctor, e) => dispatch(addDoctor(doctor, e)),
  };
};

export default connect(null, mapDispatchToProps)(NewDoctor);
