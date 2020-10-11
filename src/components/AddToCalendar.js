import React from "react";
import AddToCalendar from "react-add-to-calendar";

export default class addToCalendar extends React.Component {
  // state = {
  //   event: {
  //     title: "Sample Event",
  //     description: "This is the sample event",
  //     location: "Seattle, WA",
  //     startTime: "2020-09-16T20:15:00-04:00",
  //     endTime: "2020-10-16T21:45:00-04:00",
  //   },
  // };

  render() {
    return <AddToCalendar event={this.props.event} />;
  }
}
