import React from "react";
import { addNewComment } from "../../actions";
import { connect } from "react-redux";

class AddNewComment extends React.Component {
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

  addNewComment = (e) => {
    const { newComment } = this.state;
    e.preventDefault();
    this.props.addNewComment(newComment, e, this.props.id);

    this.setState({
      newComment: {
        text: "",
        status_open: false,
      },
    });
    e.target.reset();
  };

  render() {
    return (
      <div className="add-comment">
        <form onSubmit={(e) => this.addNewComment(e)}>
          <input
            type="text"
            placeholder="Add Note"
            name="text"
            value={this.state.newComment.text}
            onChange={this.handleInput}
          />{" "}
          <br></br>
          <label>
            {" "}
            <input
              name="status_open"
              type="checkbox"
              value={this.state.newComment.status_open}
              onChange={this.handleInputChange}
            />{" "}
            Required follow up
          </label>
          <br></br>
          {this.state.newComment.text.length > 0 ? (
            <button className="btn-width-90">Add Note for Problem</button>
          ) : null}
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

export default connect(null, mapDispatchToProps)(AddNewComment);
