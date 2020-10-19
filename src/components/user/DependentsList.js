import React from "react";
import { connect } from "react-redux";
import EditDependents from "./EditDependents";

import "reactjs-popup/dist/index.css";

class DependentsList extends React.Component {
  renderEditDependent = (id, name) => <EditDependents id={id} name={name} />;

  render() {
    const dependents = this.props.dependents;

    return (
      <div>
        <div className="column-100">
          <table className="dependents-table">
            <tbody>
              <tr>
                <th>Your Dependents: </th>
              </tr>
              {dependents.map((dependent) => (
                <tr key={dependent.id}>
                  <td> {dependent.name}</td>
                  <td>
                    {this.renderEditDependent(dependent.id, dependent.name)}{" "}
                  </td>
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
    dependents: state.dependents,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addNewDependent: (e, newDependent, userID) =>
//       dispatch(addNewDependent(e, newDependent, userID)),
//   };
// };

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(DependentsList);
