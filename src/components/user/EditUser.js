import React from "react";
import { connect } from "react-redux";
import { editUser } from "../../actions";
import { withRouter } from "react-router-dom";

class EditUser extends React.Component {
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
    this.props.editUser(this.state, e, this.props.user.user.id);
  };

  render() {
    return (
      <div className="column-100">
        {!this.props.user.user ? (
          <div> Loading... </div>
        ) : (
          <div className="column-100-bold">
            Change Your Password
            <form onSubmit={this.handleSubmit}>
              <input
                type="password"
                onChange={this.handleChange}
                value={null}
                name="password"
                placeholder="Password"
              ></input>
              <input
                type="password"
                onChange={this.handleChange}
                name="password_confirmation"
                placeholder="Password Confirmation"
                value={null}
              />
              <br />

              <button className="btn">Update</button>
            </form>
            <div>
              <br></br>
            </div>
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
