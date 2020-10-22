import React from "react";
import { connect } from "react-redux";
import { editProblem } from "../../actions";

class OneProblemInfo extends React.Component {
  state = {
    disabled: false,
    problem: {
      name: this.props.problem.name,
      description: this.props.problem.description,
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

  submitChanges = (e) => {
    e.preventDefault();
    this.props
      .editProblem(this.state.problem, this.props.id)
      .then(this.toggleDisabled());
  };

  render() {
    const { name, dependent, description } = this.props.problem;
    return (
      <div className="problem-container-description">
        {!this.state.disabled ? (
          <div>
            <div className="column-100">
              Description:
              <br />
              {description}
            </div>
            <button className="btn-width-80" onClick={this.toggleDisabled}>
              Edit Problem
            </button>
          </div>
        ) : (
          <div className="one-appointment-edit">
            <div className="column-100">
              <button className="back-btn" onClick={this.toggleDisabled}>
                Back
              </button>
              <br></br>
              <label>Dependent: {dependent.name}</label>
              <br />
              <label> Problem Name: </label> <br />
              <input
                type="text"
                name="name"
                onChange={this.saveChanges}
                placeholder={name}
                value={this.state.problem.name}
              />
              <br />
              <label> Description:</label>
              <br />
              <textarea
                name="description"
                onChange={this.saveChanges}
                placeholder={description}
                value={this.state.problem.description}
              />
              <br />
              <button className="btn" onClick={this.submitChanges}>
                Save
              </button>
            </div>
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

export default connect(null, mapDispatchToProps)(OneProblemInfo);
