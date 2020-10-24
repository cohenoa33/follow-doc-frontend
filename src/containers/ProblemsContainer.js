import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { authorized, filterDependent } from "../services/helpers";

import ProblemCard from "../components/problems/ProblemCard";
import FilterDependents from "../components/search/FilterDependents";

class ProblemsContainer extends React.Component {
  state = {
    filter: "all",
  };
  componentDidMount() {
    authorized(this.props.history);
  }

  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };

  filterByDependent = () => {
    const problems = this.props.problems.sort(function (a, b) {
      return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
    });
    return filterDependent(problems, this.state.filter);
  };

  render() {
    return (
      <div>
        <FilterDependents
          handleFilter={this.handleFilter}
          dependents={this.props.dependents}
        />
        <br />
        <div className="column-100-center">
          {this.filterByDependent().map((problem) => (
            <ProblemCard problem={problem} key={problem.id} />
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    user: state.user,
    problems: state.problems,
    dependents: state.dependents,
  };
};

export default connect(mapStateToProps)(withRouter(ProblemsContainer));
