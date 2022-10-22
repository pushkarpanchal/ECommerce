import { combineReducers } from "redux";

import authDetails from "./auth/reducer";
import cartDetails from "./cart/reducer";

const rootReducer = combineReducers({
  auth: authDetails,
  cartDetails: cartDetails,
});

export default rootReducer;
