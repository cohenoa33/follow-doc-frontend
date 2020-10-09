import React from "react";
import api from "../services/api";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";
import { addNewComment } from "../actions";

import { connect } from "react-redux";

class OneProblem extends React.Component {
  state = {
    problem: {},
    dependent: {},
    comments: [],
    newComment: {
      text: "",
      status_open: false,
    },
  };
  componentDidMount() {
    if (!this.props.user.jwt) {
      this.props.history.push("/");
    } else {
      let id = `${this.props.slug.match.params.id}`;
      api.auth.oneProblem(id).then((data) =>
        this.setState({
          problem: data,
          dependent: data.dependent,
          comments: data.comments,
        })
      );
    }
  }

  handleInputChange = () => {
    this.setState({
      ...this.state,
      newComment: {
        ...this.state.newComment,
        status_open: !this.state.newComment.status_open,
      },
    });
  };
  handleInput = (e) => {
    this.setState({
      ...this.state,
      newComment: {
        ...this.state.newComment,
        text: e.target.value,
      },
    });
  };

  updateOneProblemPage = (e) => {
    e.preventDefault();
    let today = Date.now();
    let time = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(today);
    let comment = {
      created_at: time,
      id: 0,
      problem_id: this.state.problem.id,
      status_open: this.state.newComment.status_open,
      text: this.state.newComment.text,
      updated_at: time,
    };

    this.setState({
      ...this.state,
      comments: [
        ...this.state.comments,
        {
          created_at: time,
          id: 0,
          problem_id: this.state.problem.id,
          status_open: this.state.newComment.status_open,
          text: this.state.newComment.text,
          updated_at: time,
        },
      ],
    });
  };

  render() {
    const { name, description } = this.state.problem;
    console.log(this.state.comments);
    return (
      <div>
        <div>
          <div className="problem-container-description">
            <span> {this.state.dependent.name}</span>
            <h1>{name}</h1>
            <div>{description} </div>
          </div>
          <div className="problem-container-appointments">Appointments</div>
          <div className="problem-container-buttons">
            <button className="btn">Upload File</button>
            <button className="btn">Add New Appointment</button>
            <form
              onSubmit={
                ((e) =>
                  this.props.addNewComment(
                    this.state.newComment,
                    e,
                    this.state.problem.id
                  ),
                (e) => this.updateOneProblemPage(e))
              }
            >
              <label>
                {" "}
                Status
                <input
                  name="status_open"
                  type="checkbox"
                  value={this.state.newComment.status_open}
                  onChange={this.handleInputChange}
                />{" "}
                open
              </label>
              <input
                type="text"
                placeholder="Add New Comment"
                name="text"
                value={this.state.newComment.text}
                onChange={this.handleInput}
              />
              <button className="btn">Add New Comment</button>
            </form>
          </div>
        </div>
        <br />
        <div className="one-problem-comments">
          <table className="one-problem-comments-table">
            <thead>
              <div> Comments</div>
            </thead>
            <tbody>
              {this.state.comments.map((comment) => (
                <tr key={comment.id}>
                  <td> {comment.text}</td>
                  <td> {comment.updated_at}</td>
                  <td> {comment.created_at}</td>
                  <td> {comment.status_open ? "Open" : "Closed"}</td>
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
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewComment: (newComment, e, id) =>
      dispatch(addNewComment(newComment, e, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(OneProblem));
