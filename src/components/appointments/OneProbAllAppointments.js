import React from "react";
import { connect } from "react-redux";
import Appointments from "./Appointments";
import { futureAppointments, pastAppointments } from "../../services/helpers";

const OneProbAllAppointments = ({ appointments, id }) => {
  const appointmentsList = futureAppointments(
    appointments.filter((appointment) => appointment.problem.id === +id)
  );

  return (
    <div>
      {appointmentsList.length > 0 ? (
        <div>
          <Appointments appointments={appointmentsList} />
        </div>
      ) : (
        <h1 className="h1-title">No future Appointments</h1>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
  };
};
export default connect(mapStateToProps)(OneProbAllAppointments);
