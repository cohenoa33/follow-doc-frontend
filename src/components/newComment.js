import React from "react";
import { withRouter } from "react-router-dom";
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

  updateOneProblemPage = (e) => {
    const { problem, newComment, comments } = this.state;
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
    console.log(time);
    console.log(this.state);

    // this.setState({
    //   ...this.state,
    //   comments: [
    //     ...comments,
    //     {
    //       created_at: time,
    //       id: 0,
    //       problem_id: problem.id,
    //       status_open: newComment.status_open,
    //       text: newComment.text,
    //       updated_at: time,
    //     },
    //   ],
    // });
    // this.props.addNewComment(newComment, e, problem.id);
  };

  render() {
    return (
      <div className="problem-container-new-comment">
        <form onSubmit={(e) => this.updateOneProblemPage(e)}>
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
