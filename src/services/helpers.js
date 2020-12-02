import React from "react";
import DeletePopUp from "../components/DeletePopUp";
import moment from "moment";

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
  } else if (hours === 0) {
    timeValue = "12";
  }

  timeValue += minutes < 10 ? ":0" + minutes : ":" + minutes;
  timeValue += hours >= 12 ? " PM" : " AM";

  return timeValue;
};

export const sortByAsc = (array) => {
  return array.sort(function (a, b) {
    return a.date === b.date ? 0 : a.date < b.date ? -1 : 1;
  });
};
export const sortByDesc = (array) => {
  return array.sort(function (a, b) {
    return a.date === b.date ? 0 : a.date < b.date ? 1 : -1;
  });
};

export const futureAppointments = (appointments) => {
  return appointments.filter((appointment) => {
    if (!moment(appointment.date, "YYYY/MM/DD").isBefore(moment())) {
      return appointment;
    }
  });
};
export const pastAppointments = (appointments) => {
  return appointments.filter((appointment) => {
    if (moment(appointment.date, "YYYY/MM/DD").isBefore(moment())) {
      return appointment;
    }
  });
};

export const filterDependent = (list, filter) => {
  if (filter === "all") {
    return list;
  } else {
    return list.filter((item) => item.dependent.name === filter);
  }
};

export const authorized = (props) => {
  if (!localStorage.token) {
    props.push("/");
  }
};

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
export const sortByName = (array) => {
  return array.sort(function (a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
  });
};

export const omitUserFromDependentsList = (user, list) => {
  return list.filter((dependent) => dependent.name !== user.user.username);
};
