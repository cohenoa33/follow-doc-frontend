import React from "react";
import api from "../../services/api";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class SearchResults extends React.Component {
  commentsList = () => {
    let search = this.props.search.toLowerCase();
    return this.props.comments.filter((comment) =>
      comment.text.toLowerCase().includes(search)
    );
  };
  problemsList = () => {
    // let search = this.props.search.toLowerCase();
    // let list = this.props.problems.filter((problem) =>
    //   problem.text.toLowerCase().includes(search)
    // );
    // console.log(list);
    // console.log(this.props.problems);
  };

  render() {
    return (
      <div>
        Search Results for {this.props.search}:{this.problemsList()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    problems: state.problems,
    appointments: state.appointments,
    doctors: state.doctors,
    comments: state.comments,
    search: state.search,
  };
};

export default connect(mapStateToProps)(withRouter(SearchResults));
