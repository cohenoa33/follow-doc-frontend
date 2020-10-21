import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const Appointments = ({ appointments }) => {
  return (
    <div>
      {appointments.length > 0 ? (
        <div>
          <h1 className="h1-title">Appointments List</h1>
          <div className="problems-list-table">
            <table>
              <tbody>
                <tr>
                  <th>Date </th>
                  <th>Time </th>
                  <th>Doctor Name</th>
                  <th>Todo List</th>
                  <th>Approved By Insurance</th>
                  <th>More Information</th>
                  <th></th>
                </tr>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{moment(appointment.date).format("LL")} </td>
                    <td>{appointment.time}</td>
                    <td>{appointment.doctor.name}</td>
                    <td>{appointment.status_open ? "Yes" : "No"} </td>
                    <td>{appointment.insurance_auth ? "Yes" : "No"} </td>
                    <td>{appointment.note} </td>
                    <td>
                      <Link to={`/appointments/${appointment.id}`}>
                        <button className="btn-more">MORE</button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Appointments;
