import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Problems from "../components/Problems";
import Comments from "../components/Comments";
import NewDependent from "../components/NewDependent";
import NewProblem from "../components/NewProblem";

class ProfileContainer extends React.Component {
  componentDidMount() {
    if (!localStorage.token) {
      this.props.history.push("/");
    }
  }

  renderProblems = () => <Problems />;
  renderComments = () => <Comments />;
  renderAddNewDependent = () => <NewDependent />;
  renderAddNewProblem = () => <NewProblem />;

  render() {
    return (
      <div>
        <div>Profile Page </div>
        <div className="row">
          <div className="column-50">{this.renderProblems()} </div>
          <div className="column-50">
            {this.renderComments()}
            <div> {this.renderAddNewDependent()}</div>
            <div> {this.renderAddNewProblem()}</div>
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
