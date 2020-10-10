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
      dependent_id: 0,
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
  validate = (e) => {
    e.preventDefault();
    const { name, description, dependent_id } = this.state.newProblem;
    if (dependent_id === "") {
      alert("Please Choose Dependent From List");
    } else if (name.length < 5 || description.length < 5) {
      alert("Name/Description Must be at least 5 letters long");
    } else {
      this.props.addNewProblem(this.state.newProblem, e);
      this.setState({ blockInput: true });
    }
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
                noValidate
                onSubmit={(e) => {
                  this.validate(e);
                }}
              >
                Please Select Dependent from List:
                <br></br>
                <select name="dependent_id" onChange={this.handleChange}>
                  <option name="dependent_id" value="0">
                    {" "}
                    Please Choose Dependent From List{" "}
                  </option>
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
                  noValidate
                ></input>
                <input
                  onChange={this.handleChange}
                  type="textarea"
                  value={this.state.description}
                  name="description"
                  placeholder="Description"
                  noValidate
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
