import React from "react";
import { connect } from "react-redux";
import ShortTableAppointments from "../components/appointments/ShortTableAppointments";
import { sortByAsc, futureAppointments } from "../services/helpers";
import { Link } from "react-router-dom";

const OneProbAllAppointments = ({ appointments, id }) => {
  const appointmentsList = sortByAsc(
    futureAppointments(
      appointments.filter((appointment) => appointment.problem.id === +id)
    )
  );

  return (
    <div>
      {appointmentsList.length > 0 ? (
        <div>
          <h1 className="h1-title">Next Appointments</h1>

          <ShortTableAppointments appointments={appointmentsList} />
        </div>
      ) : (
        <h1 className="h1-title">No future Appointments</h1>
      )}
      <Link to={`/problems/${id}/appointments`}>
        {" "}
        <button className="btn"> All Appointments </button>{" "}
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
  };
};
export default connect(mapStateToProps)(OneProbAllAppointments);
