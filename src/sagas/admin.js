import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAILURE,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAILURE,
  ADD_REVIEW_REQUEST,
  ADD_REVIEW_SUCCESS,
  ADD_REVIEW_FAILURE,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAILURE,
} from "../reducers/admin";

function addProductAPI(data) {
  return axios.post("/admin/addProduct", data);
}

function* addProduct(action) {
  try {
    const result = yield call(addProductAPI, action.data);
    yield put({
      type: ADD_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteProductAPI(data) {
  return axios.post("/admin/deleteProduct", data);
}

function* deleteProduct(action) {
  try {
    const result = yield call(deleteProductAPI, action.data);
    yield put({
      type: DELETE_PRODUCT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_PRODUCT_FAILURE,
      error: err.response.data,
    });
  }
}

function addReviewAPI(data) {
  return axios.post("/admin/addReview", data);
}

function* addReview(action) {
  try {
    const result = yield call(addReviewAPI, action.data);
    yield put({
      type: ADD_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

function deleteReviewAPI(data) {
  return axios.post("/admin/deleteReview", data);
}

function* deleteReview(action) {
  try {
    const result = yield call(deleteReviewAPI, action.data);
    yield put({
      type: DELETE_REVIEW_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: DELETE_REVIEW_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchAddProduct() {
  yield takeLatest(ADD_PRODUCT_REQUEST, addProduct);
}

function* watchDeleteProduct() {
  yield takeLatest(DELETE_PRODUCT_REQUEST, deleteProduct);
}

function* watchAddReview() {
  yield takeLatest(ADD_REVIEW_REQUEST, addReview);
}

function* watchDeleteReview() {
  yield takeLatest(DELETE_REVIEW_REQUEST, deleteReview);
}

export default function* adminSaga() {
  yield all([
    fork(watchAddProduct),
    fork(watchDeleteProduct),
    fork(watchAddReview),
    fork(watchDeleteReview),
  ]);
}
