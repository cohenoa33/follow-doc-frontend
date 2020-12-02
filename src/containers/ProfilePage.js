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
    console.log(this.props.user.user);
    return (
      <div>
        {this.props.user.user ? (
          <div>
            <h1 className="h1-title">
              {this.props.user.user.username} Profile Page
            </h1>
          </div>
        ) : null}
        <div className="column-50">{this.renderDependentsList()}</div>

        <div className="column-50">
          {this.renderEditUser()}
          <div>{this.renderAddNewDependent("btn-width-80")}</div>
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
