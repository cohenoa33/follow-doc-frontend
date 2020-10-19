import React from "react";
import { connect } from "react-redux";

import NewDependent from "../components/user/NewDependent";
import DependentsList from "../components/user/DependentsList";
import EditUser from "../components/user/EditUser";

class ProfilePAge extends React.Component {
  renderAddNewDependent = () => <NewDependent />;
  renderDependentsList = () => <DependentsList />;
  renderEditUser = () => <EditUser />;

  render() {
    return (
      <div>
        profile page
        <div className="column-50">
          <div> {this.renderAddNewDependent()}</div>
          <div> {this.renderDependentsList()}</div>
        </div>
        <br />
        <div className="column-50">
          <div> {this.renderEditUser()}</div>
        </div>
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
