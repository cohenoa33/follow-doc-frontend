import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import CommentSearch from "./CommentSearch";
import ProblemsSearch from "./ProblemsSearch";
import DoctorsSearch from "./DoctorsSearch";
import AppointmentsSearch from "./AppointmentsSearch";

class SearchResults extends React.Component {
  renderCommentSearch = () => <CommentSearch />;
  renderProblemsSearch = () => <ProblemsSearch />;
  renderDoctorsSearch = () => <DoctorsSearch />;
  renderAppointmentsSearch = () => <AppointmentsSearch />;

  render() {
    return (
      <div>
        <h2> That's what we found...</h2>
        {this.renderCommentSearch()}
        {this.renderProblemsSearch()}
        {this.renderAppointmentsSearch()}
        {this.renderDoctorsSearch()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
    search: state.search,
  };
};

export default connect(mapStateToProps)(withRouter(SearchResults));
