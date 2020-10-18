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
    this.setState({ blockInput: !this.state.blockInput });
    this.props.addDoctor(this.state.doctor, e);
  };

  render() {
    return (
      <Popup
        trigger={<button className="btn"> Add Doctor </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="x-btn" onClick={close}>
              x
            </button>
            <br></br>
            <br></br>
            <form
              className="popup-form"
              noValidate
              onSubmit={(e) => {
                this.handleAddDoctor(e);
              }}
            >
              <br></br>

              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.name}
                name="name"
                placeholder="Doctor Name"
              ></input>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.street}
                name="street"
                placeholder="Street"
              ></input>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.city}
                name="city"
                placeholder="City"
              ></input>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.state}
                name="state"
                placeholder="State"
              ></input>
              <input
                onChange={this.handleChange}
                type="text"
                value={this.state.zipcode}
                name="zipcode"
                placeholder="Zipcode"
              ></input>
              <br />
              {this.state.blockInput ? null : (
                <button className="btn">Add new Doctor</button>
              )}
            </form>
            <button className="btn" onClick={close}>
              {" "}
              Close{" "}
            </button>
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
