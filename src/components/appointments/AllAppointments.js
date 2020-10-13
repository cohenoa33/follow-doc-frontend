import React from "react";
import { connect } from "react-redux";
import Appointments from "./Appointments";

class AllAppointments extends React.Component {
  appointmentsList = () => {
    let appointments = this.props.appointments;
    let today = Date.now();
    let time = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(today);

    let appointmentList = appointments
      .filter((app) => app.date > time)
      .sort(function (a, b) {
        return a.date === b.date ? 0 : a.date < b.date ? 1 : -1;
      });
    return appointmentList;
  };

  render() {
    const appointments = this.appointmentsList();
    console.log(appointments);
    return (
      <div>
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
