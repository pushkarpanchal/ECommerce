import { PRODUCT_LIST } from "./types";

const productsList = (state = [], action) => {
  switch (action.type) {
    case PRODUCT_LIST:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default productsList;
