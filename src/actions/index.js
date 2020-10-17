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

export const addNewDependent = (e, newDependent, userID) => {
  e.preventDefault();
  return (dispatch) => {
    return api.dependents
      .addDependent({ name: newDependent, user_id: userID })
      .then((data) => {
        if (!data.error) {
          dispatch({ type: "ADD_DEP", payload: data });
        } else {
          alert(data.error);
        }
      });
  };
};

export const addNewProblem = (newProblem, e) => {
  const { name, description, dependent_id } = newProblem;
  e.preventDefault();
  return (dispatch) => {
    return api.problems
      .addProblem({
        name: name,
        dependent_id: dependent_id,
        description: description,
      })
      .then((data) => {
        if (!data.error) {
          dispatch({ type: "ADD_PROBLEM", payload: data });
        } else {
          alert(data.error);
        }
      });
  };
};

export const addNewComment = (newComment, e, id) => {
  e.preventDefault();
  return (dispatch) => {
    return api.comments
      .addComment({
        text: newComment.text,
        status_open: newComment.status_open,
        problem_id: id,
      })
      .then((data) => {
        if (!data.error) {
          dispatch({ type: "ADD_COMMENT", payload: data });
        } else {
          alert(data.error);
        }
      });
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
export const addDoctor = (doctor, e) => {
  e.preventDefault();
  return (dispatch) => {
    return api.doctors.addDoctor(doctor).then((data) => {
      if (!data.error) {
        dispatch({ type: "ADD_DOCTOR", payload: data });
      } else {
        alert(data.error);
      }
    });
  };
};
export const deleteComment = (id) => {
  return (dispatch) => {
    return api.comments.deleteComment(id).then((data) => {
      if (!data.error) {
        dispatch({ type: "DELETE_COMMENT", payload: id });
      } else {
        alert(data.error);
      }
    });
  };
};

export const deleteAppointment = (id) => {
  return (dispatch) => {
    return api.appointments.deleteAppointment(id).then((data) => {
      if (!data.error) {
        dispatch({ type: "DELETE_APPOINTMENT", payload: id });
      } else {
        alert(data.error);
      }
    });
  };
};

export const editComment = (comment) => {
  return (dispatch) => {
    return api.comments.editComment(comment).then((data) => {
      if (!data.error) {
        dispatch({ type: "EDIT_COMMENT", payload: data });
      } else {
        alert(data.error);
      }
    });
  };
};

export const editAppointment = (appointment) => {
  return (dispatch) => {
    return api.appointments.editAppointment(appointment).then((data) => {
      if (!data.error) {
        dispatch({ type: "EDIT_APPOINTMENT", payload: data });
      } else {
        alert(data.error);
      }
    });
  };
};

export const editProblem = (problem, id) => {
  return (dispatch) => {
    return api.problems.editProblem(problem, id).then((data) => {
      if (!data.error) {
        dispatch({ type: "EDIT_PROBLEM", payload: data });
      } else {
        alert(data.error);
      }
    });
  };
};

export const updateFile = (formData) => {
  return (dispatch) => {
    return api.problems.addFile(formData).then((data) => {
      if (!data.error) {
        dispatch({ type: "EDIT_PROBLEM", payload: data });
      } else {
        alert(data.error);
      }
    });
  };
};

export const deleteFile = (problem_id, index) => {
  return (dispatch) => {
    return api.problems.deleteFile(problem_id, index).then((data) => {
      if (!data.error) {
        dispatch({ type: "EDIT_PROBLEM", payload: data });
      } else {
        alert(data.error);
      }
    });
  };
};

export const searchValue = (search) => {
  return {
    type: "SEARCH",
    payload: search,
  };
};
