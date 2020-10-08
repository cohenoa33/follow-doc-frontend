import React from "react";
import { Route, Switch, Link, NavLink, withRouter } from "react-router-dom";

class ProfileContainer extends React.Component {
  state = {
    user: {},
    problems: [],
  };

  componentDidMount() {
    if (localStorage.token) {
      fetch("http://localhost:3000/api/v1/persist", {
        headers: {
          Authorization: `Bearer ${localStorage.token}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({
            user: { name: json.user.username, id: json.user.id },
            problems: json.user.problems,
          });
        });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    return (
      <div>
        <div>Profile Page</div>
      </div>
    );
  }
}

export default withRouter(ProfileContainer);
