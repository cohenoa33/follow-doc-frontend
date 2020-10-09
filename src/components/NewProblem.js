import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { withRouter } from "react-router-dom";
import { addNewProblem } from "../actions";
import "reactjs-popup/dist/index.css";

class NewProblem extends React.Component {
  state = {
    newProblem: {
      name: "",
      description: "",
      dependent_id: "",
    },
    blockInput: false,
  };

  handleChange = (e) => {
    this.setState({
      newProblem: {
        ...this.state.newProblem,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <Popup
        trigger={<button className="btn"> add New Problem </button>}
        modal
        nested
      >
        {(close) => (
          <div className="modal">
            <button className="x-btn" onClick={close}>
              x
            </button>
            <div className="header"> </div>
            <div className="content"> </div>
            <div className="actions">
              <form
                onSubmit={(e) => {
                  this.props.addNewProblem(this.state.newProblem, e);
                  this.setState({ blockInput: true });
                }}
              >
                <select name="dependent_id" onClick={this.handleChange}>
                  {this.props.dependents.map((dependant) => (
                    <option
                      name="dependent_id"
                      value={dependant.id}
                      key={dependant.id}
                    >
                      {dependant.name}
                    </option>
                  ))}
                </select>
                <input
                  onChange={this.handleChange}
                  type="text"
                  value={this.state.name}
                  name="name"
                  placeholder="Problem Name"
                ></input>
                <input
                  onChange={this.handleChange}
                  type="textarea"
                  value={this.state.description}
                  name="description"
                  placeholder="Description"
                ></input>
                <br />
                {this.state.blockInput ? null : (
                  <button className="btn">Add new Problem</button>
                )}
              </form>
              <button className="btn" onClick={close}>
                {" "}
                Close{" "}
              </button>
            </div>
          </div>
        )}
      </Popup>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    id: state.id,
    user: state.user,
    dependents: state.dependents,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addNewProblem: (newProblem, e) => dispatch(addNewProblem(newProblem, e)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewProblem));

// export default NewProblem;
