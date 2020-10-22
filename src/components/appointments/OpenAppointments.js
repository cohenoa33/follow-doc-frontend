import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { convertTime } from "../../services/helpers";

class OpenAppointments extends React.Component {
  filterAppointments() {
    const appointments = this.props.appointments.filter(
      (appointment) =>
        appointment.status_open === true || appointment.insurance_auth === false
    );
    if (this.props.id) {
      const list = appointments
        .filter((appointment) => appointment.problem.id === this.props.id)
        .sort(function (a, b) {
          return a.date === b.date ? 0 : a.date < b.date ? -1 : 1;
        });

      return list;
    } else {
      return appointments.sort(function (a, b) {
        return a.date === b.date ? 0 : a.date < b.date ? -1 : 1;
      });
    }
  }

  render() {
    return (
      <div className="open-comments-appointments">
        {this.filterAppointments().length > 0 ? (
          <div>
            <h1 className="h1-title">Appointments That Need Attention</h1>
            {this.filterAppointments().map((appointment) => (
              <li key={appointment.id}>
                <Link to={`/appointments/${appointment.id}`}>
                  Appointment for Doctor {appointment.doctor.name} on{" "}
                  {moment(appointment.date).format("LL")} at{" "}
                  {convertTime(appointment.time)}.
                  <br />
                  {appointment.note.length > 0
                    ? `Note: ${appointment.note}`
                    : null}
                </Link>
              </li>
            ))}
          </div>
        ) : null}
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
