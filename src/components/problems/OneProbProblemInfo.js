import React from "react";
import { connect } from "react-redux";
import { editProblem } from "../../actions";

class OneProbProblemInfo extends React.Component {
  state = {
    disabled: false,
    problem: {
      name: "",
      description: "",
    },
  };
  toggleDisabled = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  saveChanges = (e) => {
    this.setState({
      ...this.state,
      problem: {
        ...this.state.problem,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitChanges = (e, id) => {
    e.preventDefault();

    this.props.editProblem(this.state.problem, id);
    this.toggleDisabled();
  };

  render() {
    return (
      <div>
        {!this.state.disabled ? (
          <div>
            {this.props.problem.map((problem) => (
              <div className="problem-container-description">
                <span> Dependent: {problem.dependent.name}</span>
                <h1>{problem.name}</h1>
                Description:
                <div name="description-one-problem">
                  {" "}
                  {problem.description}{" "}
                </div>
                <button className="edit-btn" onClick={this.toggleDisabled}>
                  Edit
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {this.props.problem.map((problem) => (
              <div className="problem-container-description">
                <button className="x-btn" onClick={this.toggleDisabled}>
                  X
                </button>
                <br />
                <br />
                <br />
                <form onSubmit={(e) => this.submitChanges(e, problem.id)}>
                  <label>Dependent:</label>
                  <br />
                  <input
                    disabled
                    placeholder={problem.dependent.name}
                    className="one-appointment-text-area"
                  />
                  <br />
                  <br />
                  <label> Problem Name: </label> <br />
                  <input
                    className="one-appointment-text-area"
                    type="text"
                    name="name"
                    onChange={this.saveChanges}
                    placeholder={problem.name}
                    value={this.state.name}
                    disabled={!this.state.disabled ? true : false}
                  />
                  <br />
                  <label> Description:</label>
                  <br />
                  <input
                    className="one-appointment-text-area"
                    type="textarea"
                    name="description"
                    onChange={this.saveChanges}
                    placeholder={problem.description}
                    value={this.state.description}
                    disabled={!this.state.disabled ? true : false}
                  />
                  <button className="edit-btn" onClick={this.saveChanges}>
                    Save
                  </button>
                </form>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editProblem: (problem, id) => dispatch(editProblem(problem, id)),
  };
};

export default connect(null, mapDispatchToProps)(OneProbProblemInfo);
