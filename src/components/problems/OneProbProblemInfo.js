import React from "react";
import { connect } from "react-redux";
import { editProblem } from "../../actions";

class OneProbProblemInfo extends React.Component {
  state = {
    disabled: false,
  };

  toggleDisabled = () => {
    this.setState({ disabled: !this.state.disabled });
  };

  saveChanges = (e, data) => {
    // if (e.target.value !== "") {
    this.setState({
      ...this.state,
      problem: {
        ...this.state.problem,
        [e.target.name]: e.target.value,
      },
    });
  };

  submitChanges = (e) => {
    e.preventDefault();
    this.props
      .editProblem(this.state.problem, this.props.id)
      .then(this.toggleDisabled());
  };

  render() {
    console.log(this.props.problems);
    console.log(this.props.id);

    return (
      <div>
        {!this.state.disabled ? (
          <div>
            {this.props.problem.map((problem) => (
              <div className="problem-container-description">
                <span> Dependent: {problem.dependent.name}</span>
                <br />
                <h1>{problem.name}</h1>
                <br />
                Description:
                <div name="description-one-problem">{problem.description}</div>
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
                <form onSubmit={this.submitChanges}>
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
                    onChange={(e) => this.saveChanges(e, problem.name)}
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
                    onChange={(e) => this.saveChanges(e, problem.description)}
                    placeholder={problem.description}
                    value={this.state.description}
                    disabled={!this.state.disabled ? true : false}
                  />
                  <br />
                  <button className="edit-btn" onClick={this.submitChanges}>
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
const mapStateToProps = (state) => {
  return {
    problems: state.problems,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    editProblem: (problem, id) => dispatch(editProblem(problem, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OneProbProblemInfo);
