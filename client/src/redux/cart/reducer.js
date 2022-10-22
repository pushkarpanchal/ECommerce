import { CART_LIST } from "./types";

const cartDetails = (state = {}, action) => {
  switch (action.type) {
    case CART_LIST:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default cartDetails;
