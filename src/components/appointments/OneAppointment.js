import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppointmentForm from "./AppointmentForm";
import { authorized } from "../../services/helpers";

class OneAppointment extends React.Component {
  componentDidMount() {
    authorized(this.props.history);
  }

  render() {
    const id = this.props.match.params.id;
    const appointment = this.props.appointments.filter(
      (appointment) => appointment.id === +id
    );
    return (
      <div>
        {appointment.map((appointment) => (
          <AppointmentForm appointment={appointment} key={id} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    appointments: state.appointments,
  };
};

export default connect(mapStateToProps)(withRouter(OneAppointment));
