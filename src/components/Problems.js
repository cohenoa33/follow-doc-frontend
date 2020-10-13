import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Problems extends React.Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <div className="problems-list-table">
          <table>
            <tbody>
              <tr>
                <th>Problem </th>
                <th>Description </th>
                <th>Dependent </th>
              </tr>
              {this.props.problems.map((problem) => (
                <tr key={problem.id}>
                  {" "}
                  <td>
                    <Link to={`/problems/${problem.id}`}>{problem.name} </Link>
                  </td>
                  <td>{problem.description}</td>
                  <td>{problem.dependent.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
