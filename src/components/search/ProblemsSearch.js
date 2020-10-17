import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class ProblemsSearch extends React.Component {
  problemsList = () => {
    if (this.props.search.length > 0) {
      let search = this.props.search.toLowerCase();
      return this.props.problems.filter(
        (problem) =>
          problem.name.toLowerCase().includes(search) ||
          problem.description.toLowerCase().includes(search)
      );
    }
  };
  render() {
    return (
      <div className="search-results">
        Problems that match to {this.props.search}:
        {this.props.search.length > 0 ? (
          <div>
            {this.problemsList().map((problem) => (
              <Link to={`/problems/${problem.id}`}>
                <li key={problem.id}>
                  {problem.name}:<br></br>
                  {problem.description}
                </li>
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    problems: state.problems,
    search: state.search,
  };
};

export default connect(mapStateToProps)(withRouter(ProblemsSearch));
