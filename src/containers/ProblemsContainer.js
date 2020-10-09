import React from "react";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import ProblemCard from "../components/ProblemCard";

class ProblemsContainer extends React.Component {
  state = {
    filter: "all",
  };
  componentDidMount() {
    if (!this.props.user.jwt) {
      this.props.history.push("/");
    }
  }

  handleFilter = (e) => {
    this.setState({ filter: e.target.value });
  };
  filterByDependent = () => {
    const problems = this.props.problems;
    if (this.state.filter === "all") {
      return problems;
    } else {
      return problems.filter(
        (problem) => problem.dependent.name === this.state.filter
      );
    }
  };

  render() {
    console.log(this.props.dependents);
    return (
      <div>
        <div>
          <label>
            Filter by Dependent:
            <select onChange={this.handleFilter}>
              <option value="all">All</option>
              {this.props.dependents.map((dependant) => (
                <option key={dependant.id} value={dependant.name}>
                  {dependant.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <br />
        {this.filterByDependent().map((problem) => (
          <ProblemCard problem={problem} key={problem.id} />
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user,
    problems: state.problems,
    dependents: state.dependents,
  };
};

export default connect(mapStateToProps)(withRouter(ProblemsContainer));
