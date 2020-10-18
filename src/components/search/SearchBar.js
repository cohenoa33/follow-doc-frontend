import React from "react";
import { connect } from "react-redux";
import { searchValue } from "../../actions";
import { withRouter } from "react-router-dom";

class SearchBar extends React.Component {
  state = {
    search: "",
  };

  handleSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.searchValue(this.state.search);
    this.props.history.push("/search");
  };
  render() {
    return (
      <div className="search-bar">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            onChange={this.handleSearch}
            placeholder="Search"
          />
          {this.state.search.length > 0 ? (
            <button className="search-btn">Search</button>
          ) : null}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchValue: (search) => dispatch(searchValue(search)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(SearchBar));
