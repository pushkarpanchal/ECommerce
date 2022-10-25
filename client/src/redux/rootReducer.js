import { combineReducers } from "redux";

import authDetails from "./auth/reducer";
import cartDetails from "./cart/reducer";
import productsList from "./product/reducer";
const rootReducer = combineReducers({
  auth: authDetails,
  cartDetails: cartDetails,
  productsList: productsList,
});

export default rootReducer;
