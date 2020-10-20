import React from "react";
import { withRouter } from "react-router-dom";

import AllAppointments from "../components/appointments/AllAppointments";
import NewAppointment from "../components/appointments/NewAppointment";

class AppointmentsContainer extends React.Component {
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    }
  }

  renderAllAppointments = () => (
    <AllAppointments appointments={this.props.appointments} />
  );
  renderNewAppointments = () => <NewAppointment />;

  render() {
    return (
      <div className="column-100">
        {this.renderNewAppointments()}
        {this.renderAllAppointments()}
      </div>
    );
  }
}

export default withRouter(AppointmentsContainer);
