import React from "react";
import AddToCalendar from "react-add-to-calendar";

export default class addToCalendar extends React.Component {
  render() {
    return <AddToCalendar event={this.props.event} />;
  }
}
