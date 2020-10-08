import React from "react";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Problems from "../components/Problems";

class ProfileContainer extends React.Component {
  componentDidMount() {
    if (this.props.user.jwt) {
      console.log(this.props.id, "Profile");
    } else {
      this.props.history.push("/");
    }
  }

  renderProblems = () => <Problems />;

  render() {
    return (
      <div>
        <div>Profile Page </div>
        {this.renderProblems()}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user,
    id: state.user.user.id,
    problems: state.user.problems,
  };
};

export default connect(mapStateToProps)(withRouter(ProfileContainer));
