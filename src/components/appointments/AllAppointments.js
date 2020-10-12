import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class AllAppointments extends React.Component {
  appointmentsList = () => {
    let appointments = this.props.appointments;
    let today = Date.now();
    let time = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(today);

    let a = appointments
      .filter((app) => app.date > time)
      .sort(function (a, b) {
        return a.date === b.date ? 0 : a.date < b.date ? 1 : -1;
      });
    console.log(time);
    return a;
  };

  render() {
    return (
      <div>
        <h1> All Appointments </h1>
        <div className="problems-list-table">
          <table>
            <tbody>
              <tr>
                <th>Date </th>
                <th>Time </th>
                <th>Doctor Name</th>
                <th>Problem</th>
              </tr>
              {this.appointmentsList().map((app) => (
                <tr key={app.id}>
                  <td>{app.date}</td>
                  <td>{app.time}</td>
                  <td>{app.doctor.name}</td>
                  <td>
                    {" "}
                    <Link to={`/problems/${app.problem.id}`}>
                      {app.problem.name}{" "}
                    </Link>{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
