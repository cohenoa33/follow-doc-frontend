import React from "react";
import api from "../services/api";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";

import { connect } from "react-redux";

class OneProblem extends React.Component {
  state = {
    problem: {},
    dependent: {},
    comments: [],
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

  render() {
    const { name, description } = this.state.problem;
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
            <form>
              <label> </label>
              <input type="text" placeholder="Add New Comment" name="text" />
              <button className="btn">Add New Comment</button>
            </form>
          </div>
        </div>
        <br />
        <div className="one-problem-comments">
          <table className="one-problem-comments-table">
            <thead>Comments</thead>
            <tbody>
              {this.state.comments.map((comment) => (
                <tr>
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

export default connect(mapStateToProps)(withRouter(OneProblem));
