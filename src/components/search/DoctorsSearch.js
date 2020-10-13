import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class DoctorsSearch extends React.Component {
  doctorsList = () => {
    if (this.props.search.length > 0) {
      let search = this.props.search.toLowerCase();
      let filterlist = this.props.doctors.filter((doctor) => doctor.info);
      return filterlist.filter((doctor) =>
        doctor.info.toLowerCase().includes(search)
      );
    }
  };
  render() {
    return (
      <div className="search-results">
        <h3>Doctors</h3>
        {this.props.search.length > 0 ? (
          <div>
            {this.doctorsList().map((doctor) => (
              <li key={doctor.id}>
                {doctor.name}
                <br />
                {doctor.description}
              </li>
            ))}
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    doctors: state.doctors,
    search: state.search,
  };
};

export default connect(mapStateToProps)(withRouter(DoctorsSearch));
