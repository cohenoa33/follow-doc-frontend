import React from "react";
import { connect } from "react-redux";

class OpenAppointments extends React.Component {
  appointmentsList = () => {
    let appointments = this.props.appointments;
    let filteredApp = appointments.filter(
      (app) => app.status_open === true || app.insurance_auth === true
    );
    return filteredApp;
  };

  render() {
    return (
      <div>
        <h1>Appointments who needs preparation:</h1>
        {this.appointmentsList().map((app) => (
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
