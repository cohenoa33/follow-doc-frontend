import React from "react";
import api from "../services/api";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";
import { addNewComment } from "../actions";

import { connect } from "react-redux";

class NewComment extends React.Component {
  state = {
    newComment: {
      text: "",
      status_open: false,
    },
  };

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

  render() {
    return (
      <div className="problem-container-buttons">
        <button className="btn">Upload File</button>
        <button className="btn">Add New Appointment</button>
        <form
          onSubmit={(e) =>
            this.props.addNewComment(this.state.newComment, e, this.props.id)
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
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNewComment: (newComment, e, id) =>
      dispatch(addNewComment(newComment, e, id)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(NewComment));
