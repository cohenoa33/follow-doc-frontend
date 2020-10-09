// import React from "react";
// import { connect } from "react-redux";
// import Popup from "reactjs-popup";
// import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";
// import { addNewProblem } from "../actions";
// import api from "../services/api";

// import "reactjs-popup/dist/index.css";

// class NewProblem extends React.Component {
//   state = {
//     newProblem: {
//       name: "",
//       description: "",
//       dependent_id: "",
//     },
//   };
//   componentDidMount() {
//     if (!this.props.user.jwt) {
//       this.props.history.push("/");
//     }
//   }
//   handleChange = (e) => {
//     this.setState({
//       newProblem: {
//         ...this.state.newProblem,
//         [e.target.name]: e.target.value,
//       },
//     });
//   };

//   handleNewProblem = (e) => {
//     e.preventDefault();
//     const { name, description, dependent_id } = this.state.newProblem;
//     api.auth
//       .addProblem({
//         name: name,
//         dependent_id: dependent_id,
//         description: description,
//       })
//       .then((data) => {
//         if (!data.error) {
//           this.props.addNewProblem(data);
//           this.props.history.push("/profile");
//         } else {
//           alert(data.error);
//         }
//       });
//   };

//   render() {
//     return (
//       <div>
//         <div className="form-grid-newProblem">
//           <Link to="/profile">
//             {" "}
//             <button className="x-btn"> x </button>
//           </Link>{" "}
//           <br />
//           <br />
//           <br />
//           <div className="form-container-newProblem">
//             <form onSubmit={this.handleNewProblem}>
//               <select name="dependent_id" onClick={this.handleChange}>
//                 {this.props.dependents.map((dependant) => (
//                   <option
//                     name="dependent_id"
//                     value={dependant.id}
//                     key={dependant.id}
//                   >
//                     {dependant.name}
//                   </option>
//                 ))}
//               </select>
//               <input
//                 onChange={this.handleChange}
//                 type="text"
//                 value={this.state.name}
//                 name="name"
//                 placeholder="Problem Name"
//               ></input>
//               <input
//                 onChange={this.handleChange}
//                 type="textarea"
//                 value={this.state.description}
//                 name="description"
//                 placeholder="Description"
//               ></input>
//               <br />
//               <button className="btn">Submit</button>
//             </form>
//             <div>
//               <br></br>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     id: state.id,
//     user: state.user,
//     dependents: state.dependents,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addNewProblem: (newProblem) => dispatch(addNewProblem(newProblem)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(NewProblem));

// // export default NewProblem;
