import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Results extends React.Component {
  problemsList = () => {
    const { problems, search } = this.props;

    if (search.length > 0) {
      const value = search.toLowerCase();
      let filter = problems.filter(
        (problem) =>
          problem.name.toLowerCase().includes(value) ||
          problem.description.toLowerCase().includes(value)
      );

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

      return searchResult;
    }
  };
  filesList = () => {
    let list = [];
    if (this.props.search.length > 0) {
      let value = this.props.search.toLowerCase();
      let searchResult = this.props.problems.filter((problem) =>
        problem.file.filter((file) => {
          if (file.name.toLowerCase().includes(value)) {
            list.push(problem);
          }
        })
      );
      return list;
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
    console.log(this.props.search);
    return (
      <div className="search-results">
        {this.problemsList().length ||
        this.appointmentsList().length ||
        this.filesList().length ||
        this.commentsList().length > 0 ? (
          <div>
            {this.problemsList().map((problem) => (
              <li key={problem.id}>
                <Link key={problem.id} to={`/problems/${problem.id}`}>
                  Problem: {problem.name}:<br></br>
                  Description: {problem.description}
                  <br />
                </Link>
              </li>
            ))}
            {this.appointmentsList().map((appointment) => (
              <li key={appointment.id}>
                <Link
                  key={appointment.id}
                  to={`/appointments/${appointment.id}`}
                >
                  Note from Appointment for Doctor {appointment.doctor.name} on{" "}
                  {appointment.date}: {appointment.note}
                </Link>
              </li>
            ))}
            {this.commentsList().map((comment) =>
              comment.status_open === true ? (
                <li key={comment.id}>
                  {" "}
                  <Link to={`/problems/${comment.problem_id}`}>
                    {" "}
                    Note: {comment.text}
                  </Link>{" "}
                </li>
              ) : (
                <li key={comment.id}>
                  {" "}
                  <Link to={`/problems/${comment.problem_id}/archivenotes`}>
                    {" "}
                    Note: {comment.text}{" "}
                    <span className="status-open">Archived</span>
                  </Link>{" "}
                </li>
              )
            )}
            {this.filesList().map((problem) =>
              problem.file.map((file) =>
                file.name.toLowerCase().includes(this.props.search) ? (
                  <li key={file.name}>
                    <a
                      href={`http://localhost:3000/${file.path}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      File: {file.name}
                    </a>
                    Belongs to:
                    <Link key={problem.id} to={`/problems/${problem.id}`}>
                      {problem.name}
                      <br />
                    </Link>
                  </li>
                ) : null
              )
            )}
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
