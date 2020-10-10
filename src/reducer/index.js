const initialState = {
  user: {},
  problems: [],
  dependents: [],
  comments: [],
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
        dependents: action.payload.sortDependents,
        jwt: action.payload.jwt,
        id: action.payload.id,
        comments: action.payload.comments,
      };
    }
    case "USER_LOGOUT": {
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

    case "ADD_PROBLEM": {
      return {
        ...state,
        problems: [...state.problems, action.payload],
      };
    }
    case "ADD_COMMENT": {
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    }
    case "EDIT_COMMENT": {
      // const commentList = state.comments.filter(
      //   (comment) => comment.id !== action.payload.id
      // );
      // debugger;
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };
    }
    case "DELETE_COMMENT": {
      const list = state.comments.filter(
        (comment) => comment.id !== parseInt(action.payload)
      );

      return {
        ...state,
        comments: list,
      };
    }

    default:
      return state;
  }
};
