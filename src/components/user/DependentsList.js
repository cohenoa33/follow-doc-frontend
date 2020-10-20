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
          <div className="dependents-table-header">Your Dependents: </div>
          <table className="dependents-table">
            <tbody>
              {dependents.map((dependent) => (
                <tr className="dependents-table-td" key={dependent.id}>
                  <td className="dependents-table-td"> {dependent.name}</td>
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

export default connect(mapStateToProps)(DependentsList);
