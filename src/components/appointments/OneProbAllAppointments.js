import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const OneProbAllAppointments = ({ appointments, id }) => {
  const appointmentsList = appointments.filter((ap) => ap.problem.id == id);

  return (
    <div>
      <h1> All Appointments </h1>
      <div className="problems-list-table">
        <table>
          <tbody>
            <tr>
              <th>Date </th>
              <th>Time </th>
              <th>Doctor Name</th>
              <th>More Information</th>
              <th>Status</th>
              <th>Approved By Insurance</th>
            </tr>
            {appointmentsList.map((app) => (
              <tr key={app.id}>
                <td>
                  <Link to={`/appointments/${app.id}`}>{app.date} </Link>
                </td>
                <td>{app.time}</td>
                <td>{app.doctor.name}</td>
                <td>{app.note} </td>
                <td>{app.status_open ? "Open" : "Close"} </td>
                <td>{app.insurance_auth ? "Yes" : "No"} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
    problems: state.problems,
    state: state,
  };
};
export default connect(mapStateToProps)(OneProbAllAppointments);
