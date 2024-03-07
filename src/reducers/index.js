import { combineReducers } from "redux";
import user from "./user";
import product from "./product";
import cart from "./cart";
import review from "./review";
import admin from "./admin";
import order from "./order";

const rootReducer = combineReducers({
  user,
  product,
  cart,
  review,
  admin,
  order,
});

export default rootReducer;
