import React from "react";
import { connect } from "react-redux";
import Appointments from "./Appointments";
import {
  sortByDesc,
  futureAppointments,
  pastAppointments,
} from "../../services/helpers";

class AllAppointments extends React.Component {
  render() {
    const appointments = sortByDesc(this.props.appointments);

    return (
      <div>
        {futureAppointments ? (
          <div>
            <h1 className="h1-title">Future Appointments</h1>
            <Appointments appointments={futureAppointments(appointments)} />
          </div>
        ) : null}

        {appointments ? (
          <div>
            <h1 className="h1-title">Past Appointments</h1>
            <Appointments appointments={pastAppointments(appointments)} />
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

export default connect(mapStateToProps)(AllAppointments);
