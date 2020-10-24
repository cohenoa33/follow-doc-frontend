import React from "react";
import { withRouter } from "react-router-dom";
import { authorized } from "../services/helpers";

import AllAppointments from "./AllAppointments";

class AppointmentsContainer extends React.Component {
  componentDidMount() {
    authorized(this.props.history);
  }

  renderAllAppointments = () => (
    <AllAppointments appointments={this.props.appointments} />
  );

  render() {
    return <div>{this.renderAllAppointments()}</div>;
  }
}

export default withRouter(AppointmentsContainer);
