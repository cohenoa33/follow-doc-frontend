import api from "../services/api";

export const setLogin = (user) => {
  let dependents = user.user.dependents.filter(
    (dependent, index, self) =>
      index ===
      self.findIndex((d) => d.id === dependent.id && d.name === dependent.name)
  );
  let sortDependents = dependents.sort(function (a, b) {
    return a.name === b.name ? 0 : a.name < b.name ? -1 : 1;
  });
  let comments = user.user.comments;
  let problems = user.user.problems;
  let jwt = user.jwt;
  let id = user.user.id;
  let appointments = user.user.appointments;
  let doctors = user.user.doctors;
  // debugger;
  return {
    type: "USER_LOGIN",
    payload: {
      sortDependents,
      user,
      problems,
      jwt,
      id,
      comments,
      appointments,
      doctors,
    },
  };
};

export const setLogout = () => {
  return {
    type: "USER_LOGOUT",
    payload: {},
  };
};

export const addNewDependent = (newDependent, userID, e) => {
  e.preventDefault();
  return (dispatch) => {
    return api.auth
      .addDependent({ name: newDependent, user_id: userID })
      .then((data) => dispatch({ type: "ADD_DEP", payload: data }));
  };
};

export const addNewProblem = (newProblem, e) => {
  const { name, description, dependent_id } = newProblem;
  e.preventDefault();
  return (dispatch) => {
    return api.auth
      .addProblem({
        name: name,
        dependent_id: dependent_id,
        description: description,
      })
      .then((data) => dispatch({ type: "ADD_PROBLEM", payload: data }));
  };
};

export const addNewComment = (newComment, e, id) => {
  e.preventDefault();
  return (dispatch) => {
    return api.auth
      .addComment({
        text: newComment.text,
        status_open: newComment.status_open,
        problem_id: id,
      })
      .then((data) => dispatch({ type: "ADD_COMMENT", payload: data }));
  };
};

export const addAppointment = (appointment, e) => {
  e.preventDefault();
  return (dispatch) => {
    return api.appointments.addAppointment(appointment).then((data) => {
      if (!data.error) {
        dispatch({ type: "ADD_APPOINTMENT", payload: data });
      } else {
        alert(data.error);
      }
    });
  };
};
export const deleteComment = (id) => {
  return (dispatch) => {
    return api.auth
      .deleteComment(id)
      .then((data) => dispatch({ type: "DELETE_COMMENT", payload: id }));
  };
};

export const addEditComment = (comment, e, id) => {
  e.preventDefault();
  return (dispatch) => {
    return api.auth
      .editComment(comment, id)
      .then((data) => dispatch({ type: "EDIT_COMMENT", payload: data }));
  };
};
