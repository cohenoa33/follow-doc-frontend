import React from "react";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Problems from "../components/Problems";
import Comments from "../components/Comments";
import Dependent from "../components/Dependent";

class ProfileContainer extends React.Component {
  componentDidMount() {
    if (!this.props.user.jwt) {
      this.props.history.push("/");
    }
  }

  renderProblems = () => <Problems />;
  renderComments = () => <Comments />;
  renderAddNewDependent = () => <Dependent />;

  render() {
    console.log(this.props.dependents);
    return (
      <div>
        <div>Profile Page </div>
        <div className="row">
          <div className="column-50">{this.renderProblems()} </div>
          <div className="column-50">
            {this.renderComments()}
            <div> {this.renderAddNewDependent()}</div>

            <button className="btn"> Add New Problem </button>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    problems: state.user.problems,
    dependents: state.dependents,
  };
};

export default connect(mapStateToProps)(withRouter(ProfileContainer));
