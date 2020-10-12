import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GoogleApiWrapper from "../../containers/MapContainer";

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
    console.log(appointment);
    return (
      <div>
        {appointment.map((appointment) => (
          <div>
            <p className="one-appointment-data">{appointment.date} </p>
            <p className="one-appointment-data">{appointment.time} </p>
            <p className="one-appointment-data">{appointment.note} </p>
            <p className="one-appointment-data">{appointment.doctor.name} </p>
            <p className="one-appointment-data">
              {appointment.doctor.address}{" "}
            </p>
            <p className="one-appointment-data">{appointment.problem.name} </p>
          </div>
        ))}

        <div>
          <div className="map-squere">
            <GoogleApiWrapper />
          </div>
        </div>
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
