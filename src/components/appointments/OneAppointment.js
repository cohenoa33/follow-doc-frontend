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
            <h1>Appointment for {appointment.problem.name}</h1>
            <div className="column-60">
              <form>
                <label> Doctor: </label> <br />
                <input
                  type="text"
                  placeholder={appointment.doctor.name}
                  disabled
                />
                <br />
                <label> Date: </label> <br />
                <input
                  disabled
                  type="text"
                  className="one-appointment-data"
                  placeholder={appointment.date}
                />
                <br />
                <label> Time: </label>
                <br />
                <input type="text" placeholder={appointment.time} disabled />
                <br />
                <label> Address: </label> <br />
                <input
                  type="text"
                  placeholder={appointment.doctor.address}
                  disabled
                />
                <br />
                <label> Additional Information: </label> <br />
                <label>
                  {appointment.insurance_auth
                    ? "Waiting for Insurance Approval"
                    : "Approved By Insurance"}{" "}
                </label>{" "}
                <label>
                  <br />
                  <br />
                  {appointment.status_open
                    ? "Status: Open"
                    : "Status: Close"}{" "}
                </label>{" "}
                <br />
                <input
                  type="textarea"
                  placeholder={appointment.note}
                  disabled
                />
              </form>
            </div>
            <div className="map-squere">
              <GoogleApiWrapper
                lat={appointment.doctor.latitude}
                lng={appointment.doctor.longitude}
              />
            </div>
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
    problems: state.problems,
  };
};

export default connect(mapStateToProps)(withRouter(OneAppointment));
