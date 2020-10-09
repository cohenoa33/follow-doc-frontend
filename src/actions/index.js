import api from "../services/api";

export const setLogin = (user) => {
  let dependents = user.user.dependents.filter(
    (dependent, index, self) =>
      index ===
      self.findIndex((d) => d.id === dependent.id && d.name === dependent.name)
  );
  let problems = user.user.problems;
  let jwt = user.jwt;
  let id = user.user.id;

  return {
    type: "USER_LOGIN",
    payload: { dependents, user, problems, jwt, id },
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
