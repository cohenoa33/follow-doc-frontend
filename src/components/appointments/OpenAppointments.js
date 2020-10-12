import React from "react";
import { connect } from "react-redux";

class OpenAppointments extends React.Component {
  state = {
    list: {},
  };
  filterdAppointments() {
    const appointments = this.props.appointments.filter(
      (app) => app.status_open === true || app.insurance_auth === true
    );
    if (this.props.id) {
      return appointments.filter((app) => app.problem.id === this.props.id);
    } else {
      return appointments;
    }
  }

  render() {
    return (
      <div>
        <h1>Appointments who needs preparation:</h1>
        {this.filterdAppointments().map((app) => (
          <li key={app.id}>
            {" "}
            Appointment for {app.doctor.name} on {app.date} at {app.time}.
            Notes:
            {app.note}
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
