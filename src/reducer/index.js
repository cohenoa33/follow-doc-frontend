import { combineReducers } from "redux";

const initialState = {
  user: {},
  problems: [],
  dependents: [],
  comments: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return {
        ...state,
        user: action.payload.user,
        problems: action.payload.user.user.problems,
        dependents: action.payload.user.user.dependents,
        comments: action.payload.user.user.comments,
      };
    }
    case "USER_LOGOUT": {
      console.log("User logged out");
      return {
        ...state,
        user: {},
        problems: [],
        dependents: [],
        comments: [],
      };
    }

    default:
      return state;
  }
};

// const rootReducer = combineReducers({
//   userReducer: userReducer,
// });
