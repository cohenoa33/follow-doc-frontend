import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Problems extends React.Component {
  render() {
    return (
      <div>
        {this.props.problems.length > 0 ? (
          <div>
            <h1 className="h1-title">Problems List</h1>
            <div className="problems-list-table">
              <table>
                <tbody>
                  <tr>
                    <th>Problem Name</th>
                    <th>Description</th>
                    <th>Dependent</th>
                    <th></th>
                  </tr>
                  {this.props.problems.map((problem) => (
                    <tr key={problem.id}>
                      <td>{problem.name} </td>
                      <td>{problem.description}</td>
                      <td>{problem.dependent.name}</td>
                      <td>
                        <Link to={`/problems/${problem.id}`}>
                          <button className="btn-more">MORE</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <h1>After You Add Problems They Will Appear Here</h1>
        )}
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
