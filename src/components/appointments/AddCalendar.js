import React from "react";
import AddToCalendar from "react-add-to-calendar";

const AddCalendar = (props) => {
  let items = [{ google: "Google" }, { apple: "Apple Calendar" }];

  return (
    <AddToCalendar
      // class
      buttonLabel="Add To Calendar" // className from react-add-to-calendar "add-to-calendar"
      listItems={items}
      event={props.event}
    />
  );
};
export default AddCalendar;
