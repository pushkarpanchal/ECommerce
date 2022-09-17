import { LOGIN, SIGNUP } from "./types";

const authDetails = (state = {}, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        data: action.payload,
      };

    case SIGNUP:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default authDetails;
