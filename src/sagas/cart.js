import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_CART_REQUEST,
  ADD_CART_SUCCESS,
  ADD_CART_FAILURE,
  LOAD_CART_REQUEST,
  LOAD_CART_SUCCESS,
  LOAD_CART_FAILURE,
} from "../reducers/cart";

function addCartAPI(data) {
  return axios.post("/cart/add", data);
}

function* addCart(action) {
  try {
    const result = yield call(addCartAPI, action.data);
    yield put({
      type: ADD_CART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_CART_FAILURE,
      error: err.response.data,
    });
  }
}

function loadCartAPI(data) {
  return axios.post("/cart/load", data);
}

function* loadCart(action) {
  try {
    const result = yield call(loadCartAPI, action.data);
    yield put({
      type: LOAD_CART_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_CART_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchaddCart() {
  yield takeLatest(ADD_CART_REQUEST, addCart);
}

function* watchloadCart() {
  yield takeLatest(LOAD_CART_REQUEST, loadCart);
}

export default function* cartSaga() {
  yield all([fork(watchaddCart), fork(watchloadCart)]);
}
