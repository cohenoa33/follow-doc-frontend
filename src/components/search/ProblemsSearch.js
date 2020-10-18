// import React from "react";
// import { withRouter } from "react-router-dom";
// import { connect } from "react-redux";
// import { Link } from "react-router-dom";

// class ProblemsSearch extends React.Component {
//   problemsList = () => {
//     const { problems, search, comments } = this.props;

//     if (search.length > 0) {
//       const value = search.toLowerCase();
//       let filter = problems.filter(
//         (problem) =>
//           problem.name.toLowerCase().includes(value) ||
//           problem.description.toLowerCase().includes(value)
//       );
//       let filteredComments = comments.filter((comment) =>
//         comment.text.toLowerCase().includes(value)
//       );
//       const commentsId = filteredComments.map((comment) => comment.problem_id);
//       for (let i = 0; i < commentsId.length; i++) {
//         let problem = problems.find(
//           (problems) => problems.id === commentsId[i]
//         );
//         filter.push(problem);
//       }
//       let searchResult = filter.filter(
//         (problem, index, self) =>
//           index ===
//           self.findIndex((p) => p.id === problem.id && p.name === problem.name)
//       );
//       return searchResult;
//     }
//   };

//   render() {
//     return (
//       <div className="search-results">
//         Problems that match to {this.props.search}:
//         {this.props.search.length > 0 ? (
//           <div>
//             {this.problemsList().map((problem) => (
//               <Link to={`/problems/${problem.id}`}>
//                 <li key={problem.id}>
//                   {problem.name}:<br></br>
//                   {problem.description}
//                   {problem.comments.map((comment) => (
//                     <li className="comments-search" key={comment.id}>
//                       {" "}
//                       {comment.text}
//                     </li>
//                   ))}
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
//     problems: state.problems,
//     search: state.search,
//     comments: state.comments,
//   };
// };

// export default connect(mapStateToProps)(withRouter(ProblemsSearch));
