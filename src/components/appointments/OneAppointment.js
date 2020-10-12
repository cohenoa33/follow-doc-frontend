import React from "react";
import api from "../../services/api";
import { withRouter } from "react-router-dom";
import { deleteComment, addNewComment } from "../../actions";
import { connect } from "react-redux";

class OneAppointment extends React.Component {
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    }
  }

  render() {
    const id = this.props.match.params.id;
    const appointment = this.props.appointments.filter(
      (appointment) => appointment.id === +id
    );
    return (
      <div>
        {appointment.map((appointment) => (
          <div>
            <p className="one-appointment-data">{appointment.date} </p>
            <p className="one-appointment-data">{appointment.time} </p>
            <p className="one-appointment-data">{appointment.note} </p>
            <p className="one-appointment-data">{appointment.doctor.name} </p>
            <p className="one-appointment-data">{appointment.problem.name} </p>
          </div>
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
