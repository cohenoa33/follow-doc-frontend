import React from "react";
import { connect } from "react-redux";
import FullTableAppointments from "./FullTableAppointments";
import {
  futureAppointments,
  sortByDesc,
  filterDependent,
} from "../../services/helpers";
import FilterDependents from "../search/FilterDependents";
import SortFuture from "../search/SortFuture";

class AllAppointments extends React.Component {
  state = {
    filter: "all",
    futureOnly: false,
  };

  handleFilter = (e) => {
    this.setState({ ...this.state, filter: e.target.value });
  };
  handleSort = () => {
    this.setState({ ...this.state, futureOnly: !this.state.futureOnly });
  };
  filterByDependent = () => {
    const { filter, futureOnly } = this.state;
    const appointments = sortByDesc(this.props.appointments);
    if (futureOnly) {
      return futureAppointments(filterDependent(appointments, filter));
    }
    return filterDependent(appointments, filter);
  };

  render() {
    return (
      <div>
        <SortFuture
          handleSort={this.handleSort}
          status={this.state.futureOnly}
        />
        <FilterDependents
          handleFilter={this.handleFilter}
          dependents={this.props.dependents}
        />
        <div>
          <FullTableAppointments appointments={this.filterByDependent()} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    appointments: state.appointments,
    dependents: state.dependents,
  };
};

export default connect(mapStateToProps)(AllAppointments);
