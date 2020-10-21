import React from "react";
import { connect } from "react-redux";
import Popup from "reactjs-popup";
import { withRouter } from "react-router-dom";
import { addProblem } from "../../actions";
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
      this.props.addProblem(this.state.newProblem, e).then((data) => {
        if (!data) {
          this.setState({ blockInput: true });
        }
      });
    }
  };

  refreshState = () => {
    this.setState({
      newProblem: {
        name: "",
        description: "",
        dependent_id: 0,
      },
      blockInput: false,
    });
  };

  render() {
    return (
      <Popup
        trigger={<button className="btn-width-90"> Add New Problem </button>}
        modal
        nested
        closeOnDocumentClick={false}
        onOpen={this.refreshState}
      >
        {(close) => (
          <div className="modal">
            <button className="back-btn" onClick={close}>
              back
            </button>
            <div className="success-message">
              {this.state.blockInput ? "Added Problem Successfully" : null}{" "}
            </div>
            <form
              className="popup-form"
              noValidate
              onSubmit={(e) => {
                this.validate(e);
              }}
            >
              <div className="form-title">Add New Problem</div>
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
                required
              ></input>
              <textarea
                onChange={this.handleChange}
                value={this.state.description}
                name="description"
                placeholder="Description"
                required
              />
              <br />
              {this.state.blockInput ? (
                <button className="btn" onClick={close}>
                  {" "}
                  Close{" "}
                </button>
              ) : (
                <button className="btn-width-90">Add new Problem</button>
              )}
            </form>
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
    addProblem: (newProblem) => dispatch(addProblem(newProblem)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NewProblem));
