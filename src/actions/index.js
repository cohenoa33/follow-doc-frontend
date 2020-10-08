export const setLogin = (user) => {
  return {
    type: "USER_LOGIN",
    payload: { user },
  };
};

export const setLogout = () => {
  return {
    type: "USER_LOGOUT",
    payload: {},
  };
};
