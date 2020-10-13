import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GoogleApiWrapper from "../../containers/MapContainer";
import { deleteAppointment } from "../../actions";
import AddToCalendar from "./AddToCalendar";

class AppointmentForm extends React.Component {
  handleDelete = () => {
    this.props.deleteAppointment(this.props.appointment.id);
    this.props.history.push("/profile");
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

    let prob = this.props.problems
      .filter((p) => p.id === problem.id)
      .map((problem) => problem);
    let dependent = prob[0].dependent.name;

    const newTime = `${+time.split(":")[0] + 1}:${time.split(":")[1]}`;
    const event = {
      title: `Appointment to Dr.${doctor.name} for ${dependent}`,
      description: `Problem: ${problem.name}`,
      location: `${doctor.address}`,
      startTime: `${date}T${time}:00-04:00`,
      endTime: `${date}T${newTime}:00-04:00`,
    };

    return (
      <div>
        <h1>Appointment for {dependent} </h1>
        <h1>Problem: {problem.name} </h1>

        <div className="column-60">
          <form>
            <label> Doctor: </label> <br />
            <input type="text" placeholder={doctor.name} disabled />
            <br />
            <label> Date: </label> <br />
            <input
              disabled
              type="text"
              className="one-appointment-data"
              placeholder={date}
            />
            <br />
            <label> Time: </label>
            <br />
            <input type="text" placeholder={time} disabled />
            <br />
            <label> Address: </label> <br />
            <input type="text" placeholder={doctor.address} disabled />
            <br />
            <label>
              {insurance_auth
                ? "Waiting for Insurance Approval"
                : "Approved By Insurance"}{" "}
            </label>{" "}
            <label>
              <br />
              {status_open ? "Status: Open" : "Status: Close"}{" "}
            </label>{" "}
            <br />
            <br />
            <label> Additional Information: </label> <br />
            <input
              className="one-appointment-text-area"
              type="textarea"
              placeholder={note}
              disabled
            />
            <div>
              <div className="add-to-calendar">
                <AddToCalendar event={event} />
              </div>
            </div>
          </form>
          <button key={id} className="btn" onClick={this.handleDelete}>
            {" "}
            Delete Appointment
          </button>
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
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AppointmentForm));
