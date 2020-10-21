import React from "react";
import { connect } from "react-redux";
import { editUser } from "../../actions";
import { withRouter } from "react-router-dom";

class EditUser extends React.Component {
  state = {
    password: "",
    password_confirmation: "",
    blockInput: false,
  };
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.editUser(this.state, e, this.props.user.user.id).then((data) => {
      if (!data) {
        this.setState({
          blockInput: true,
        });
      }
    });
  };

  refreshState = () => {
    this.setState({
      password: "",
      password_confirmation: "",
      blockInput: false,
    });
  };

  render() {
    return (
      <div className="column-100">
        {!this.props.user.user ? (
          <div> Loading... </div>
        ) : (
          <div className="column-100">
            {this.state.blockInput ? (
              <div className="success-message">
                {" "}
                <h1>Your Password Has Been Changed Successfully</h1>
              </div>
            ) : (
              <div>
                <h1 className="h1-title">Change Your Password</h1>
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    name="password"
                    placeholder="Password"
                    required
                  ></input>
                  <input
                    type="password"
                    onChange={this.handleChange}
                    name="password_confirmation"
                    placeholder="Password Confirmation"
                    value={this.state.password_confirmation}
                    required
                  />
                  <button className="btn">Update</button>
                </form>
                <div>
                  <br></br>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    id: state.id,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (user, e, id) => dispatch(editUser(user, e, id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(EditUser));
