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

export const addNewDependent = (newDependent, userID) => {
  return (dispatch) => {
    return api.auth
      .addDependent({ name: newDependent, user_id: userID })
      .then((data) => dispatch({ type: "ADD_DEP", payload: data }));
  };
};
