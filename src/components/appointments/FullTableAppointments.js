import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { convertTime } from "../../services/helpers";

const FullTableAppointments = ({ appointments }) => {
  return (
    <div>
      {appointments.length > 0 ? (
        <div>
          <div className="problems-list-table">
            <table>
              <tbody>
                <tr>
                  <th>Date </th>
                  <th>Time </th>
                  <th>Doctor Name</th>
                  <th>Problem and Dependent Name</th>
                  <th>More Information</th>
                  <th>Need Attention</th>
                  {/* <th>Approved By Insurance</th> */}
                  <th></th>
                </tr>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{moment(appointment.date).format("LL")} </td>
                    <td>{convertTime(appointment.time)}</td>
                    <td>{appointment.doctor.name}</td>
                    <td>
                      <Link to={`/problems/${appointment.problem.id}`}>
                        {appointment.problem.name} for{" "}
                        {appointment.dependent.name}
                      </Link>
                    </td>
                    <td>{appointment.note} </td>
                    <td>{appointment.status_open ? "Yes" : "No"} </td>
                    {/* <td>{appointment.insurance_auth ? "Yes" : "No"} </td> */}
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
      ) : (
        "No Appointments Scheduled"
      )}
    </div>
  );
};

export default FullTableAppointments;
