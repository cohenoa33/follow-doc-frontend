import React from "react";
import { connect } from "react-redux";

class Problems extends React.Component {
  render() {
    console.log(this.props, "From Problems");
    return (
      <div>
        <h1> Problems list </h1>
        <div className="problems-list-table">
          <tr>
            <th>Problem </th>
            <th>Description </th>
            <th>Dependent </th>
          </tr>
          {this.props.problems.map((problem) => (
            <tr>
              <td>{problem.name}</td>
              <td>{problem.description}</td>
              <td>{problem.dependent.name}</td>
            </tr>
          ))}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    problems: state.problems,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Problems);
