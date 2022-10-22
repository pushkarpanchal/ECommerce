import { CART_LIST } from "./types";

export const cartReducer = (payload) => {
  return {
    type: CART_LIST,
    payload: payload,
  };
};
