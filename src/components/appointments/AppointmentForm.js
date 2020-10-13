import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import GoogleApiWrapper from "../../containers/MapContainer";

class AppointmentForm extends React.Component {
  render() {
    const {
      id,
      date,
      time,
      note,
      insurance_auth,
      status_open,
      problem,
      doctor,
    } = this.props.appointment;

    let prob = this.props.problems
      .filter((p) => p.id === problem.id)
      .map((problem) => problem);
    let dependent = prob[0].dependent.name;

    return (
      <div>
        <h1>Appointment for {dependent} </h1>
        <h1>Problem: {problem.name} </h1>

        <div className="column-60">
          <form>
            <label> Doctor: </label> <br />
            <input type="text" placeholder={doctor.name} disabled />
            <br />
            <label> Date: </label> <br />
            <input
              disabled
              type="text"
              className="one-appointment-data"
              placeholder={date}
            />
            <br />
            <label> Time: </label>
            <br />
            <input type="text" placeholder={time} disabled />
            <br />
            <label> Address: </label> <br />
            <input type="text" placeholder={doctor.address} disabled />
            <br />
            <label>
              {insurance_auth
                ? "Waiting for Insurance Approval"
                : "Approved By Insurance"}{" "}
            </label>{" "}
            <label>
              <br />
              {status_open ? "Status: Open" : "Status: Close"}{" "}
            </label>{" "}
            <br />
            <br />
            <label> Additional Information: </label> <br />
            <input
              className="one-appointment-text-area"
              type="textarea"
              placeholder={note}
              disabled
            />
          </form>
          <button key={id} className="btn" onClick={null}>
            {" "}
            Delete Appointment
          </button>
        </div>
        <div className="map-squere">
          <GoogleApiWrapper lat={doctor.latitude} lng={doctor.longitude} />
        </div>
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

export default connect(mapStateToProps)(withRouter(AppointmentForm));
