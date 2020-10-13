import React from "react";
import { connect } from "react-redux";
import Appointments from "./Appointments";

const OneProbAllAppointments = ({ appointments, id }) => {
  const appointmentsList = appointments.filter(
    (appointment) => appointment.problem.id == id
  );
  console.log(appointmentsList);

  return (
    <div>
      <Appointments appointments={appointmentsList} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
  };
};
export default connect(mapStateToProps)(OneProbAllAppointments);
