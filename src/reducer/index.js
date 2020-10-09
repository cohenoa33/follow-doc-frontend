import { combineReducers } from "redux";

const initialState = {
  user: {},
  problems: [],
  dependents: [],
  jwt: "",
  id: "",
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGIN": {
      return {
        ...state,
        user: action.payload.user,
        problems: action.payload.problems,
        dependents: action.payload.dependents,
        jwt: action.payload.jwt,
        id: action.payload.id,
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

    case "ADD_DEP": {
      return {
        ...state,
        dependents: [...state.dependents, action.payload],
      };
    }

    default:
      return state;
  }
};
