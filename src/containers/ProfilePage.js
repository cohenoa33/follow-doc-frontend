import React from "react";
import { connect } from "react-redux";

import NewDependent from "../components/user/NewDependent";
import DependentsList from "../components/user/DependentsList";
import EditUser from "../components/user/EditUser";

class ProfilePAge extends React.Component {
  renderAddNewDependent = (className) => <NewDependent className={className} />;
  renderDependentsList = () => <DependentsList />;
  renderEditUser = () => <EditUser />;

  render() {
    return (
      <div>
        <div className="column-50">
          {this.renderDependentsList()}
          {this.renderAddNewDependent("btn")}
        </div>

        <div className="column-50">{this.renderEditUser()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(ProfilePAge);
