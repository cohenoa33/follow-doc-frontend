import React from "react";
import { connect } from "react-redux";
import FullTableAppointments from "./FullTableAppointments";
import { sortByDesc, filterDependent } from "../../services/helpers";
import FilterDependents from "../search/FilterDependents";

class AllAppointments extends React.Component {
  state = {
    filter: "all",
    futureOnly: false,
  };

  handleFilter = (e) => {
    this.setState({ ...this.state, [e.target.name]: e.target.value });
  };
  filterByDependent = () => {
    const appointments = sortByDesc(this.props.appointments);
    return filterDependent(appointments, this.state.filter);
  };

  render() {
    return (
      <div>
        <h1 className="h1-title">Appointments List</h1>

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
