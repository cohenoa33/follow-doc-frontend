import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { authorized } from "../../services/helpers";

import Results from "./Results";

class SearchResults extends React.Component {
  componentDidMount() {
    authorized(this.props.history);
  }

  renderResults = () => <Results />;

  render() {
    return (
      <div>
        {this.props.search.length > 0 ? (
          <div>{this.renderResults()}</div>
        ) : (
          <div> Please Try Again </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    search: state.search,
  };
};

export default connect(mapStateToProps)(withRouter(SearchResults));
