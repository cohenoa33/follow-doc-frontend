// import React from "react";
// import { deleteComment } from "../../actions";
// import { connect } from "react-redux";
// import EditComment from "./EditComment";
// import { withRouter } from "react-router-dom";
// import moment from "moment";

// class OneProbComments extends React.Component {
//   handleDeleteComment = (e) => {
//     let id = e.target.id;
//     this.props.deleteComment(id);
//   };
//   renderEditComment = (id, text, status_open) => (
//     <EditComment id={id} text={text} status_open={status_open} />
//   );

//   render() {
//     const id = this.props.match.params.id;
//     const comments = this.props.comments.filter(
//       (comment) => comment.problem_id === +id && comment.status_open === false
//     );

//     return (
//       <div>
//         <h1 className="h1-title">Notes</h1>
//         {comments.length > 0 ? (
//           <div className="column-100">
//             <table className="one-problem-comments-table">
//               <tbody>
//                 <tr>
//                   <th>Note</th>
//                   <th>Last update</th>
//                   <th>Create at</th>
//                   <th>Todo List</th>
//                 </tr>
//                 {comments.map((comment) => (
//                   <tr key={comment.id}>
//                     <td> {comment.text}</td>
//                     <td> {moment(comment.updated_at).format("LLL")}</td>
//                     <td> {moment(comment.created_at).format("LLL")}</td>
//                     <td> {comment.status_open ? "Yes" : "No"}</td>
//                     <td>
//                       {this.renderEditComment(
//                         comment.id,
//                         comment.text,
//                         comment.status_open
//                       )}{" "}
//                     </td>
//                     <td>
//                       <button
//                         className="btn-delete"
//                         id={comment.id}
//                         onClick={this.handleDeleteComment}
//                       >
//                         X
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : null}
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     comments: state.comments,
//     problems: state.problems,
//   };
// };
// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteComment: (id) => dispatch(deleteComment(id)),
//   };
// };

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(withRouter(OneProbComments));

import React from "react";
import { deleteComment } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import OneProbCommentsTable from "./OneProbCommentTable";

class OneProbComments extends React.Component {
  renderOneProbCommentsTable = (comments) => (
    <OneProbCommentsTable comments={comments} />
  );

  render() {
    const id = this.props.match.params.id;

    const openComments = this.props.comments.filter(
      (comment) => comment.problem_id === +id && comment.status_open === true
    );
    const closeComments = this.props.comments.filter(
      (comment) => comment.problem_id === +id && comment.status_open === false
    );

    return (
      <div>
        {openComments.length > 0 ? (
          <div>
            <h1 className="h1-title">Todo List</h1>
            {this.renderOneProbCommentsTable(openComments)}
          </div>
        ) : null}
        {closeComments.length > 0 ? (
          <div>
            <h1 className="h1-title">Notes Archive </h1>
            {this.renderOneProbCommentsTable(closeComments)}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
    problems: state.problems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteComment: (id) => dispatch(deleteComment(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OneProbComments));
