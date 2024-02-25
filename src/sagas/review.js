import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  LOAD_REVIEWS_REQUEST,
  LOAD_REVIEWS_SUCCESS,
  LOAD_REVIEWS_FAILURE,
} from "../reducers/review";

function loadReviewsAPI() {
  return axios.post("/review/load");
}

function* loadReviews() {
  try {
    const result = yield call(loadReviewsAPI);
    yield put({
      type: LOAD_REVIEWS_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: LOAD_REVIEWS_FAILURE,
      error: err.response.data,
    });
  }
}

function* watchloadReviews() {
  yield takeLatest(LOAD_REVIEWS_REQUEST, loadReviews);
}

export default function* reviewSaga() {
  yield all([fork(watchloadReviews)]);
}
