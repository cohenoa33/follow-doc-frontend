import React from "react";
import { connect } from "react-redux";
import Appointments from "./Appointments";
import NewAppointment from "./NewAppointment";

class AllAppointments extends React.Component {
  appointmentsList = () => {
    let appointments = this.props.appointments;

    let appointmentList = appointments.sort(function (a, b) {
      return a.date === b.date ? 0 : a.date < b.date ? 1 : -1;
    });
    return appointmentList;
  };

  render() {
    const appointments = this.appointmentsList();

    return (
      <div>
        <div>
          <NewAppointment />
        </div>
        <Appointments appointments={appointments} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
  };
};

export default connect(mapStateToProps)(AllAppointments);
