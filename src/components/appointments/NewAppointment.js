import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { withRouter } from "react-router-dom";
import { addAppointment } from "../../actions";

class NewAppointment extends React.Component {
  state = {
    appointment: {
      date: "",
      time: "",
      doctor_id: 0,
      problem_id: 0,
      insurance_auth: false,
      status_open: false,
    },
    blockInput: false,
  };

  handleChange = (e) => {
    this.setState({
      appointment: {
        ...this.state.appointment,
        [e.target.name]: e.target.value,
      },
    });
  };

  filterDocors = () => {
    return this.props.doctors.filter(
      (doctor, index, self) =>
        index ===
        self.findIndex((d) => d.id === doctor.id && d.name === doctor.name)
    );
  };
  validate = (e) => {
    e.preventDefault();

    this.props.addAppointment(this.state.appointment, e);
    this.setState({ blockInput: true });
  };

  render() {
    return (
      <Popup
        trigger={<button className="btn"> add New Appointment </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="x-btn" onClick={close}>
              x
            </button>
            <br></br>
            <br></br>
            <form
              className="popup-form"
              noValidate
              onSubmit={(e) => {
                this.validate(e);
              }}
            >
              <br></br>

              <select name="problem_id" onChange={this.handleChange}>
                <option name="problem_id" value="0">
                  {" "}
                  Please Choose Problem From List{" "}
                </option>
                {this.props.problems.map((problem) => (
                  <option
                    name="problem_id"
                    value={problem.id}
                    key={problem.name}
                  >
                    {problem.name} for {problem.dependent.name}
                  </option>
                ))}
              </select>
              <select name="doctor_id" onChange={this.handleChange}>
                <option name="doctor_id" value="0">
                  {" "}
                  Please Choose Doctor From List{" "}
                </option>
                {this.filterDocors().map((doctor) => (
                  <option name="doctor_id" value={doctor.id} key={doctor.name}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              <br />
              <input
                onChange={this.handleChange}
                type="date"
                value={this.state.date}
                name="date"
                placeholder="Date"
                noValidate
              ></input>
              <br />
              <input
                onChange={this.handleChange}
                type="time"
                value={this.state.time}
                name="time"
                placeholder="time"
                noValidate
              ></input>
              <br />
              {this.state.blockInput ? null : (
                <button className="btn">Add new Appointment</button>
              )}
            </form>
            <button className="btn" onClick={close}>
              {" "}
              Close{" "}
            </button>
          </div>
        )}
      </Popup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    problems: state.problems,
    doctors: state.doctors,
    id: state.user.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addAppointment: (appointment, e) =>
      dispatch(addAppointment(appointment, e)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewAppointment));
