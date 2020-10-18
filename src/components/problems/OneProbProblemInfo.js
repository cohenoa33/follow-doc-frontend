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
    return (
      <div className="problem-container-description">
        {!this.state.disabled ? (
          <div>
            {this.props.problem.map((problem) => (
              <div className="column-100" key={problem.id}>
                <button className="btn-edit" onClick={this.toggleDisabled}>
                  edit
                </button>
                <br />
                <p>
                  {" "}
                  Dependent:
                  <br />
                  {problem.dependent.name}
                </p>
                <h1>{problem.name}</h1>
                <br />
                Description:
                <br />
                {problem.description}
              </div>
            ))}
          </div>
        ) : (
          <div className="one-appointment-edit">
            {this.props.problem.map((problem) => (
              <div className="column-100">
                <button className="back-btn" onClick={this.toggleDisabled}>
                  Back
                </button>
                <br></br>
                <label>Dependent:</label>
                <br />
                <input disabled placeholder={problem.dependent.name} />
                <br />
                <label> Problem Name: </label> <br />
                <input
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
                  type="textarea"
                  name="description"
                  onChange={(e) => this.saveChanges(e, problem.description)}
                  placeholder={problem.description}
                  value={this.state.description}
                  disabled={!this.state.disabled ? true : false}
                />
                <br />
                <button className="btn" onClick={this.submitChanges}>
                  Save
                </button>
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
