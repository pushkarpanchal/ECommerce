import { PRODUCT_LIST } from "./types";

export const productsReducer = (payload) => {
  return {
    type: PRODUCT_LIST,
    payload: payload,
  };
};
