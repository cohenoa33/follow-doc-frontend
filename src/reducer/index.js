const initialState = {
  user: {},
  problems: [],
  dependents: [],
  comments: [],
  appointments: [],
  doctors: [],
  jwt: "",
  id: "",
  search: "",
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
        appointments: action.payload.appointments,
        doctors: action.payload.doctors,
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
    case "ADD_APPOINTMENT": {
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
      };
    }

    case "ADD_DOCTOR": {
      return {
        ...state,
        doctors: [...state.doctors, action.payload],
      };
    }

    case "EDIT_COMMENT": {
      return {
        ...state,
        comments: state.comments
          .filter((comment) => comment.id !== action.payload.id)
          .push(action.payload),
      };
    }
    case "EDIT_APPOINTMENT": {
      return {
        ...state,
        appointments: state.appointments
          .filter((appointment) => appointment.id !== action.payload.id)
          .push(action.payload),
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
    case "DELETE_APPOINTMENT": {
      const list = state.appointments.filter(
        (appointment) => appointment.id !== parseInt(action.payload)
      );
      return {
        ...state,
        appointments: list,
      };
    }
    case "SEARCH": {
      return {
        ...state,
        search: action.payload,
      };
    }

    default:
      return state;
  }
};
