import React from "react";
import AddToCalendar from "react-add-to-calendar";

const addToCalendar = () => {
  let items = [{ google: "Google" }, { apple: "Apple Calendar" }];

  return (
    <AddToCalendar
      // class
      buttonLabel="Add To Calendar" // className from react-add-to-calendar "add-to-calendar"
      listItems={items}
      event={this.props.event}
    />
  );
};
export default AddToCalendar;
