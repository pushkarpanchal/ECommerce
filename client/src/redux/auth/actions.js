import { LOGIN } from "./types";

export const loginReducer = (payload) => {
  return {
    type: LOGIN,
    payload: payload,
  };
};
