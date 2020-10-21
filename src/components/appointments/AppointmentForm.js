import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GoogleApiWrapper from "../../containers/MapContainer";
import { deleteAppointment, editAppointment } from "../../actions";
import AddToCalendar from "./AddToCalendar";
import moment from "moment";

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
    const disabled = this.state.disabled;
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
        <h1 className="h1-title">
          {dependent} Appointment For
          <Link to={`/problems/${problem.id}`}>{problem.name}</Link>
          <button className="btn-10" onClick={this.handleEditButton}>
            Edit
          </button>
          <button className="btn-red-10" onClick={this.handleDelete}>
            Delete
          </button>{" "}
        </h1>
        {disabled ? (
          <div className="column-50-text-left">
            <table>
              <tbody>
                <tr>
                  <td>Doctor:</td>
                  <td>{doctor.name}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>{doctor.address}</td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td>{moment(date).format("LL")}</td>
                </tr>
                <tr>
                  <td>Time:</td>
                  <td>{time}</td>
                </tr>
                <tr>
                  <td>Add to Todo List:</td>
                  {status_open ? (
                    <td className="status-open">Yes</td>
                  ) : (
                    <td className="status-close">No</td>
                  )}
                </tr>
                <tr>
                  <td>Approved By Insurance:</td>
                  {insurance_auth ? (
                    <td className="status-close">Yes</td>
                  ) : (
                    <td className="status-open">No</td>
                  )}
                </tr>
                <tr>
                  <td>Additional Information:</td>
                  <td>{note}</td>
                </tr>
              </tbody>
            </table>
            <div className="add-to-calendar">
              <AddToCalendar event={event} />
            </div>
          </div>
        ) : (
          <div className="column-50-text-left">
            <button onClick={this.handleEditButton} className="back-btn">
              Back
            </button>
            <br />

            <table>
              <tbody>
                <tr>
                  <td>Doctor:</td>
                  <td>{doctor.name}</td>
                </tr>
                <tr>
                  <td>Address:</td>
                  <td>{doctor.address}</td>
                </tr>
                <tr>
                  <td>Date:</td>
                  <td>{moment(date).format("LL")}</td>
                </tr>
                <tr>
                  <td>Time:</td>
                  <td>{time}</td>
                </tr>
              </tbody>
            </table>

            <form onSubmit={(e) => this.handleSubmit(e, id)}>
              <label>
                <input
                  name="status_open"
                  type="checkbox"
                  onChange={this.handleChange}
                  value={status_open}
                />{" "}
                {status_open ? "Remove from Todo List" : "Add to Todo List"}
              </label>
              <br />
              <label>
                {" "}
                <input
                  name="insurance_auth"
                  type="checkbox"
                  value={insurance_auth}
                  onChange={this.handleChange}
                />{" "}
                {insurance_auth
                  ? "Not Approved by Insurance"
                  : "Approved by Insurance"}
              </label>
              <br />
              <label> Additional Information: </label> <br />
              <textarea
                name="note"
                type="text"
                value={this.state.appointment.note}
                placeholder={note}
                noValidate
                className="edit-appointment-textarea"
                onChange={this.handleChange}
              />
              <button
                type="submit"
                className="btn-width-80"
                onClick={(e) => this.handleSubmit(e, id)}
              >
                {" "}
                Save Changes
              </button>
            </form>
          </div>
        )}
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
