import React from "react";
import { withRouter } from "react-router-dom";

import AllAppointments from "../components/appointments/AllAppointments";

class AppointmentsContainer extends React.Component {
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    }
  }

  renderAllAppointments = () => (
    <AllAppointments appointments={this.props.appointments} />
  );

  render() {
    return <div>{this.renderAllAppointments()}</div>;
  }
}

export default withRouter(AppointmentsContainer);
