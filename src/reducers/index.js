import { combineReducers } from "redux";
import user from "./user";
import product from "./product";
import cart from "./cart";

const rootReducer = combineReducers({
  user,
  product,
  cart,
});

export default rootReducer;
