import { GET_LIST } from "../_actions/types";

function listReducer(state = {}, action) {
  switch (action.type) {
    case GET_LIST:
      return { ...state, list: action.payload };
      break;
    default:
      return state;
  }
}

export default listReducer;
