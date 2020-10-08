const initialState = {
  user: {},
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "USER_LOGOUT": {
      return {
        ...state,
        user: {},
      };
    }
    default:
      return state;
  }
};
