import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { withRouter } from "react-router-dom";
import { addAppointment } from "../../actions";

class NewAppointment extends React.Component {
  state = {
    appointment: {
      date: "",
      time: "",
      doctor_id: 0,
      problem_id: 0,
      insurance_auth: false,
      status_open: false,
    },
    blockInput: false,
    success: false,
  };

  handleChange = (e) => {
    let name = e.target.name;
    if (name === "insurance_auth" || name === "status_open") {
      this.setState({
        appointment: {
          ...this.state.appointment,
          [name]: !this.state.name,
        },
      });
    } else {
      this.setState({
        appointment: {
          ...this.state.appointment,
          [name]: e.target.value,
        },
      });
    }
  };
  handleAddAppointment = (e) => {
    this.setState({ blockInput: !this.state.blockInput });
    this.props.addAppointment(this.state.appointment, e).then(
      this.setState((state) => ({
        ...state,
        success: !state.success,
      }))
    );
  };

  filterDoctors = () => {
    return this.props.doctors.filter(
      (doctor, index, self) =>
        index ===
        self.findIndex((d) => d.id === doctor.id && d.name === doctor.name)
    );
  };

  problemsList = () => {
    if (this.props.id) {
      return this.props.problems.filter((p) => p.id === this.props.id);
    } else {
      return this.props.problems;
    }
  };

  render() {
    return (
      <Popup
        trigger={<button className="btn"> add New Appointment </button>}
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
            <br></br>
            {this.state.success ? "Appointment saved" : null}
            <form
              className="popup-form"
              noValidate
              onSubmit={(e) => {
                this.handleAddAppointment(e);
              }}
            >
              <br></br>

              <select name="problem_id" onChange={this.handleChange}>
                <option name="problem_id" value="0">
                  {" "}
                  Please Choose Problem From List{" "}
                </option>

                {this.problemsList().map((problem) => (
                  <option name="problem_id" value={problem.id} key={problem.id}>
                    {problem.name} for {problem.dependent.name}
                  </option>
                ))}
              </select>
              <select name="doctor_id" onChange={this.handleChange}>
                <option name="doctor_id" value="0">
                  {" "}
                  Please Choose Doctor From List{" "}
                </option>
                {this.filterDoctors().map((doctor) => (
                  <option name="doctor_id" value={doctor.id} key={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              <br />
              <input
                onChange={this.handleChange}
                type="date"
                value={this.state.appointment.date}
                name="date"
                placeholder="Date"
                required
                noValidate
              ></input>
              <br />
              <input
                onChange={this.handleChange}
                type="time"
                value={this.state.appointment.time}
                name="time"
                placeholder="time"
                noValidate
                required
              ></input>
              <br />
              <label>
                {" "}
                <input
                  name="status_open"
                  type="checkbox"
                  value={this.state.appointment.status_open}
                  onChange={this.handleChange}
                />{" "}
                Mark as Open
              </label>
              <label>
                {" "}
                <input
                  name="insurance_auth"
                  type="checkbox"
                  value={this.state.appointment.insurance_auth}
                  onChange={this.handleChange}
                />{" "}
                Approved by Insurance
              </label>
              <input
                onChange={this.handleChange}
                type="textarea"
                value={this.state.appointment.note}
                name="note"
                placeholder="Add More Information"
                noValidate
              ></input>

              <br />
              {this.state.blockInput ? null : (
                <button className="btn" type="Submit">
                  Add new Appointment
                </button>
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

const mapStateToProps = (state) => {
  return {
    problems: state.problems,
    doctors: state.doctors,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addAppointment: (appointment, e) =>
      dispatch(addAppointment(appointment, e)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewAppointment));
