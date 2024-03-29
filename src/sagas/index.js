import { all, fork } from "redux-saga/effects";
import axios from "axios";
import userSaga from "./user";
import productSaga from "./product";
import cartSaga from "./cart";
import reviewSaga from "./review";
import adminSaga from "./admin";
import orderSaga from "./order";
import { API_URL } from "../constants";

axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(productSaga),
    fork(cartSaga),
    fork(reviewSaga),
    fork(adminSaga),
    fork(orderSaga),
  ]);
}
