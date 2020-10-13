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
        <h2> Search Results for</h2> <h1> {this.props.search}</h1>
        {this.renderCommentSearch()}
        {this.renderProblemsSearch()}
        {this.renderDoctorsSearch()}
        {this.renderAppointmentsSearch()}
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
