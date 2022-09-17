import { combineReducers } from "redux";

import authDetails from "./auth/reducer";

const rootReducer = combineReducers({
  auth: authDetails,
});

export default rootReducer;
