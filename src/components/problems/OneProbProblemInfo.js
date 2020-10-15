import React from "react";

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

  handleSaveChanges = (e) => {
    this.setState({
      ...this.state,
      problem: {
        ...this.state.problem,
        [e.target.name]: e.target.value,
      },
    });
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
                <form>
                  <label>Dependent:</label>
                  <br />
                  <input disabled placeholder={problem.dependent.name} />
                  <br />
                  <br />
                  <label> Problem Name: </label> <br />
                  <input
                    className="one-appointment-text-area"
                    type="text"
                    name="name"
                    onChange={this.handleSaveChanges}
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
                    onChange={this.handleSaveChanges}
                    placeholder={problem.description}
                    value={this.state.description}
                    disabled={!this.state.disabled ? true : false}
                  />
                  <button className="edit-btn" onClick={this.handleSaveChanges}>
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

export default OneProbProblemInfo;
