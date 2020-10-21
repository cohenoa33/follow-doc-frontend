import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Results extends React.Component {
  problemsList = () => {
    const { problems, search, comments } = this.props;

    if (search.length > 0) {
      const value = search.toLowerCase();
      let filter = problems.filter(
        (problem) =>
          problem.name.toLowerCase().includes(value) ||
          problem.description.toLowerCase().includes(value)
      );
      // let filteredComments = comments.filter((comment) =>
      //   comment.text.toLowerCase().includes(value)
      // );
      // const commentsId = filteredComments.map((comment) => comment.problem_id);
      // for (let i = 0; i < commentsId.length; i++) {
      //   let problem = problems.find(
      //     (problems) => problems.id === commentsId[i]
      //   );
      //   filter.push(problem);
      // }
      let searchResult = filter.filter(
        (problem, index, self) =>
          index ===
          self.findIndex((p) => p.id === problem.id && p.name === problem.name)
      );
      return searchResult;
    }
  };

  commentsList = () => {
    if (this.props.search.length > 0) {
      let value = this.props.search.toLowerCase();
      let searchResult = this.props.comments.filter((comment) =>
        comment.text.toLowerCase().includes(value)
      );
      console.log(searchResult);
      return searchResult;
    }
  };

  appointmentsList = () => {
    if (this.props.search.length > 0) {
      let value = this.props.search.toLowerCase();
      let filterList = this.props.appointments.filter(
        (appointment) => appointment.note
      );
      return filterList.filter(
        (appointment) =>
          appointment.note.toLowerCase().includes(value) ||
          appointment.doctor.name.toLowerCase().includes(value)
      );
    }
  };

  render() {
    return (
      <div className="search-results">
        {this.problemsList().length ||
        this.appointmentsList().length ||
        this.commentsList().length > 0 ? (
          <div>
            {this.problemsList().map((problem) => (
              <Link to={`/problems/${problem.id}`}>
                <li className="serach-list" key={problem.id}>
                  Problem: {problem.name}:<br></br>
                  Description: {problem.description}
                  <br />
                  {/* comments:
                    {problem.comments.map((comment) => (
                      <li className="comments-search" key={comment.id}>
                        {" "}
                        {comment.text}
                      </li>
                    ))} */}
                </li>
              </Link>
            ))}

            {this.appointmentsList().map((appointment) => (
              <Link key={appointment.id} to={`/appointments/${appointment.id}`}>
                <li key={appointment.id}>
                  Note from Appointment for Doctor {appointment.doctor.name} on{" "}
                  {appointment.date}: {appointment.note}
                </li>
              </Link>
            ))}

            {this.commentsList().map((comment) => (
              <Link key={comment.id} to={`/problems/${comment.problem_id}`}>
                <li key={comment.id}>Comment: {comment.text}</li>
              </Link>
            ))}
          </div>
        ) : (
          <h1> No results for match to {this.props.search} </h1>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    problems: state.problems,
    search: state.search,
    comments: state.comments,
    appointments: state.appointments,
  };
};

export default connect(mapStateToProps)(withRouter(Results));
