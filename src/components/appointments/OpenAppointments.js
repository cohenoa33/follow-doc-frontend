import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class OpenAppointments extends React.Component {
  state = {
    list: {},
  };
  filterdAppointments() {
    const appointments = this.props.appointments.filter(
      (appointment) =>
        appointment.status_open === true || appointment.insurance_auth === false
    );
    if (this.props.id) {
      return appointments.filter(
        (appointment) => appointment.problem.id === this.props.id
      );
    } else {
      return appointments;
    }
  }

  render() {
    return (
      <div className="open-comments-appointments">
        <h1>Appointments who needs preparation:</h1>
        {this.filterdAppointments().map((appointment) => (
          <li key={appointment.id}>
            <Link to={`/appointments/${appointment.id}`}>
              Appointment for {appointment.doctor.name} on {appointment.date} at{" "}
              {appointment.time}.
              <br /> Notes: {appointment.note}
            </Link>
          </li>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
  };
};

export default connect(mapStateToProps)(OpenAppointments);
