import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GoogleApiWrapper from "../../containers/MapContainer";
import { deleteAppointment, editAppointment } from "../../actions";
import AddToCalendar from "./AddToCalendar";

class AppointmentForm extends React.Component {
  state = {
    disabled: true,
    appointment: {
      status_open: this.props.appointment.status_open,
      insurance_auth: this.props.appointment.insurance_auth,
      note: this.props.appointment.note,
      id: this.props.appointment.id,
    },
  };

  handleChange = (e) => {
    const { status_open, insurance_auth } = this.state.appointment;
    let name = e.target.name;
    if (name === "status_open") {
      this.setState({
        ...this.state,
        appointment: {
          ...this.state.appointment,
          status_open: !status_open,
        },
      });
    } else if (name === "insurance_auth") {
      this.setState({
        ...this.state,
        appointment: {
          ...this.state.appointment,
          insurance_auth: !insurance_auth,
        },
      });
    } else {
      this.setState({
        ...this.state,
        appointment: {
          ...this.state.appointment,
          [name]: e.target.value,
        },
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editAppointment(this.state.appointment);
    this.handleEditButton();
  };

  handleEditButton = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  handleDelete = () => {
    this.props.deleteAppointment(this.props.appointment.id);
    this.props.history.push("/home");
  };

  render() {
    const {
      id,
      date,
      time,
      note,
      insurance_auth,
      status_open,
      problem,
      doctor,
    } = this.props.appointment;

    let prob = this.props.problems.find((p) => p.id === problem.id);
    let dependent = prob.dependent.name;

    const hour = +time.split(":")[0] + 1;
    const updatedHour = hour < 10 ? `0${hour}` : hour;
    const newTime = `${updatedHour}:${time.split(":")[1]}`;
    const event = {
      title: `Appointment to Dr.${doctor.name} for ${dependent}`,
      description: `Problem: ${problem.name}`,
      location: `${doctor.address}`,
      startTime: `${date}T${time}:00-07:00`,
      endTime: `${date}T${newTime}:00-07:00`,
    };

    return (
      <div>
        <h1>Appointment for {dependent} </h1>
        <Link to={`/problems/${problem.id}`}>
          <h1>Problem: {problem.name}</h1>
        </Link>
        <div className="column-50">
          <form
            onChange={this.handleChange}
            onSubmit={(e) => this.handleSubmit(e, id)}
          >
            <label> Doctor: </label> <br />
            <input
              type="text"
              placeholder={doctor.name}
              disabled
              value={this.state.doctor}
            />
            <br />
            <label> Address: </label> <br />
            <input type="text" placeholder={doctor.address} disabled />
            <br />
            <label> Date: </label> <br />
            <input
              type="text"
              className="one-appointment-data"
              placeholder={date}
              disabled
            />
            <br />
            <label> Time: </label>
            <br />
            <input
              type="text"
              className="one-appointment-data"
              placeholder={time}
              disabled
            />
            <br />
            {this.state.disabled ? (
              <div>
                <label>{status_open ? "Status: Open" : "Status: Close"}</label>
                <br />
                <br />
                <label>
                  {insurance_auth
                    ? "Approved By Insurance"
                    : "Waiting for Insurance Approval"}{" "}
                </label>{" "}
              </div>
            ) : (
              <div>
                <br></br>
                <label>
                  {" "}
                  <input
                    name="status_open"
                    type="checkbox"
                    value={status_open}
                  />{" "}
                  {status_open ? "Mark as Closed" : "Mark as Open"}
                </label>
                <br />
                <br></br>
                <label>
                  {" "}
                  <input
                    name="insurance_auth"
                    type="checkbox"
                    value={insurance_auth}
                  />{" "}
                  {insurance_auth
                    ? "Need Insurance Approval"
                    : "Approved By Insurance"}
                </label>
              </div>
            )}
            <br />
            <br />
            <label> Additional Information: </label> <br />
            <textarea
              name="note"
              value={this.state.note}
              disabled={this.state.disabled ? true : false}
              noValidate
            />
            {this.state.disabled ? null : (
              <div>
                <button type="submit" className="btn">
                  Save Changes
                </button>
                <button onClick={this.handleEditButton} className="btn">
                  Back
                </button>
              </div>
            )}
          </form>
          {this.state.disabled ? (
            <div>
              <div>
                <div className="add-to-calendar">
                  <AddToCalendar event={event} />
                </div>
              </div>
              <button className="btn" onClick={this.handleEditButton}>
                Edit Appointment
              </button>
              <button className="btn" onClick={this.handleDelete}>
                Delete Appointment
              </button>{" "}
            </div>
          ) : null}
        </div>
        <div className="map-squere">
          <GoogleApiWrapper lat={doctor.latitude} lng={doctor.longitude} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    appointments: state.appointments,
    problems: state.problems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteAppointment: (id) => dispatch(deleteAppointment(id)),
    editAppointment: (appointment) => dispatch(editAppointment(appointment)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppointmentForm));
