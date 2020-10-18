// import React from "react";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

// class AppointmentsSearch extends React.Component {
//   appointmentsList = () => {
//     if (this.props.search.length > 0) {
//       let search = this.props.search.toLowerCase();
//       let filterList = this.props.appointments.filter(
//         (appointment) => appointment.note
//       );
//       return filterList.filter(
//         (appointment) =>
//           appointment.note.toLowerCase().includes(search) ||
//           appointment.doctor.name.toLowerCase().includes(search)
//       );
//     }
//   };

//   render() {
//     return (
//       <div className="search-results">
//         {this.props.search.length && this.appointmentsList().length > 0 ? (
//           <div>
//             {this.appointmentsList().map((appointment) => (
//               <Link key={appointment.id} to={`/appointments/${appointment.id}`}>
//                 <li key={appointment.id}>
//                   {appointment.note}: Note for the appointment for Doctor{" "}
//                   {appointment.doctor.name} on {appointment.date}.
//                 </li>
//               </Link>
//             ))}
//           </div>
//         ) : null}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     appointments: state.appointments,
//     search: state.search,
//   };
// };

// export default connect(mapStateToProps)(withRouter(AppointmentsSearch));
