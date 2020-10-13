import React from "react";
import { Link } from "react-router-dom";

const Appointments = ({ appointments }) => {
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
              <th>More Information</th>
              <th>Status</th>
              <th>Approved By Insurance</th>
            </tr>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>
                  <Link to={`/appointments/${appointment.id}`}>
                    {appointment.date}{" "}
                  </Link>
                </td>
                <td>{appointment.time}</td>
                <td>{appointment.doctor.name}</td>
                <td>{appointment.note} </td>
                <td>{appointment.status_open ? "Open" : "Close"} </td>
                <td>{appointment.insurance_auth ? "Yes" : "No"} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
