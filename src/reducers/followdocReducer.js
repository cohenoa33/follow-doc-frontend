export default function followdocReducer(
  state = {
    items: [],
    user: {},
  },
  action
) {
  switch (action.type) {
    case "INCREASE_COUNT":
      return {
        ...state,
        items: state.items.concat(state.items.length + 1),
      };
    case "DECREASE_COUNT":
      return {
        ...state,
        items: state.items.concat(state.items.length - 1),
      };
    case "LOGIN":
      return {
        ...state,
        items: state.user.concat(state.items.length - 1),
      };
    default:
      return state;
  }
}
