import React from "react";
import DeletePopUp from "../components/DeletePopUp";

export const renderDeletePopup = (handleDelete, className) => (
  <DeletePopUp handleDelete={handleDelete} className={className} />
);

export const convertTime = (timeToConvert) => {
  let time = timeToConvert.split(":");
  let hours = +time[0];
  let minutes = +time[1];
  let timeValue;
  if (hours > 0 && hours <= 12) {
    timeValue = "" + hours;
  } else if (hours > 12) {
    timeValue = "" + (hours - 12);
  } else if (hours == 0) {
    timeValue = "12";
  }

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
  timeValue += hours >= 12 ? " PM" : " AM";

  return timeValue;
};
