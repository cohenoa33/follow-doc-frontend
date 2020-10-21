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
      note: "",
    },
    blockInput: false,
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
    this.props.addAppointment(this.state.appointment, e).then((data) => {
      if (!data) {
        this.setState({ blockInput: true });
      }
    });
  };

  filterDoctors = () => {
    if (this.props.doctors) {
      return this.props.doctors.filter(
        (doctor, index, self) =>
          index ===
          self.findIndex((d) => d.id === doctor.id && d.name === doctor.name)
      );
    } else {
      return this.props.doctors;
    }
  };

  problemsList = () => {
    if (this.props.id) {
      return this.props.problems.filter((p) => p.id === this.props.id);
    } else {
      return this.props.problems;
    }
  };
  refreshState = () => {
    this.setState({
      appointment: {
        date: "",
        time: "",
        doctor_id: 0,
        problem_id: 0,
        insurance_auth: false,
        status_open: false,
        note: "",
      },
      blockInput: false,
    });
  };

  render() {
    return (
      <Popup
        trigger={
          <button className="btn-width-90"> Add New Appointment </button>
        }
        modal
        nested
        closeOnDocumentClick={false}
        onOpen={this.refreshState}
      >
        {(close) => (
          <div className="modal">
            {this.filterDoctors().length > 0 ? (
              <div>
                <button className="back-btn" onClick={close}>
                  back
                </button>
                <br></br>
                <div className="success-message">
                  {this.state.blockInput
                    ? "Added Appointment Successfully"
                    : null}{" "}
                </div>
                <form
                  className="popup-form"
                  noValidate
                  onSubmit={(e) => {
                    this.handleAddAppointment(e);
                  }}
                >
                  <div className="form-title"> New Appointment</div>
                  <select name="problem_id" onChange={this.handleChange}>
                    <option name="problem_id" value="0">
                      {" "}
                      Please Choose Problem From List{" "}
                    </option>

                    {this.problemsList().map((problem) => (
                      <option
                        name="problem_id"
                        value={problem.id}
                        key={problem.id}
                      >
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
                      <option
                        name="doctor_id"
                        value={doctor.id}
                        key={doctor.name}
                      >
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
                  ></input>
                  <br />
                  <input
                    onChange={this.handleChange}
                    type="time"
                    value={this.state.appointment.time}
                    name="time"
                    placeholder="time"
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
                    Required Follow Up
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
                  <textarea
                    onChange={this.handleChange}
                    value={this.state.appointment.note}
                    name="note"
                    placeholder="Add More Information"
                    noValidate
                  />
                  <br />
                  {this.state.blockInput ? (
                    <button className="btn" onClick={close}>
                      {" "}
                      Close{" "}
                    </button>
                  ) : (
                    <button className="btn-width-90" type="Submit">
                      Add new Appointment
                    </button>
                  )}
                </form>
              </div>
            ) : (
              <div> Loading...</div>
            )}
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
