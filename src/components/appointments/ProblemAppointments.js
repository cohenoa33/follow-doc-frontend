import React from "react";
import { connect } from "react-redux";
import ShortTableAppointments from "./ShortTableAppointments";
import { Link } from "react-router-dom";

const ProblemAppointments = ({ appointments, id }) => {
  let appointmentsList = appointments.filter(
    (appointment) => appointment.problem.id === id
  );

  return (
    <div>
      <Link to={`/problems/${id}`}>
        <button className="back-btn">back</button>
      </Link>
      {appointmentsList.length > 0 ? (
        <div>
          <h1 className="h1-title">Appointments</h1>
          <ShortTableAppointments appointments={appointmentsList} />
        </div>
      ) : (
        <h1 className="h1-title">No Appointments</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
  };
};
export default connect(mapStateToProps)(ProblemAppointments);
