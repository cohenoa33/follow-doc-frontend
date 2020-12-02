import React from "react";
import { connect } from "react-redux";
import { editUser } from "../../actions";
import { withRouter } from "react-router-dom";
import { authorized } from "../../services/helpers";

class EditUser extends React.Component {
  state = {
    changePassword: false,
    password: "",
    password_confirmation: "",
    blockInput: false,
  };
  componentDidMount() {
    authorized(this.props.history);
  }
  changePassword = () => {
    this.setState({ changePassword: !this.state.changePassword });
  };

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
          <>
            {this.state.changePassword ? (
              <div className="column-100">
                {this.state.blockInput ? (
                  <div className="success-message">
                    {" "}
                    <h1>Your Password Has Been Changed Successfully</h1>
                  </div>
                ) : (
                  <div>
                    <h1 className="h1-title">Change password</h1>
                    <p>
                      It's a good idea to use a strong password that you're not
                      using elsewhere
                    </p>
                    <form onSubmit={this.handleSubmit}>
                      <input
                        type="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                        name="password"
                        placeholder="New Password"
                        required
                      ></input>
                      <input
                        type="password"
                        onChange={this.handleChange}
                        name="password_confirmation"
                        placeholder="Re-type New Password"
                        value={this.state.password_confirmation}
                        required
                      />
                      <button className="btn">Save Changes</button>
                    </form>
                    <div>
                      <br></br>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button className="btn-width-80" onClick={this.changePassword}>
                  Change Password
                </button>
              </div>
            )}
          </>
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
