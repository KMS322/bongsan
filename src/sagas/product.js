import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_PRODUCTS_REQUEST,
  LOAD_PRODUCTS_SUCCESS,
  LOAD_PRODUCTS_FAILURE,
} from "../reducers/product";

function loadProductsAPI() {
  return axios.post("/product/load");
}

function* loadProducts() {
  try {
    const result = yield call(loadProductsAPI);
    yield put({
      type: LOAD_PRODUCTS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_PRODUCTS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchloadProducts() {
  yield takeLatest(LOAD_PRODUCTS_REQUEST, loadProducts);
}

export default function* productSaga() {
  yield all([fork(watchloadProducts)]);
}
