import { all, fork, takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";
import {
  SEND_EMAIL_REQUEST,
  SEND_EMAIL_SUCCESS,
  SEND_EMAIL_FAILURE,
} from "../reducers/order";

function sendEmailAPI(data) {
  return axios.post("/order/sendEmail", data);
}

function* sendEmail(action) {
  try {
    const result = yield call(sendEmailAPI, action.data);
    yield put({
      type: SEND_EMAIL_SUCCESS,
      data: result.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: SEND_EMAIL_FAILURE,
      error: error.response.data,
    });
  }
}

function* watchsendEmail() {
  yield takeLatest(SEND_EMAIL_REQUEST, sendEmail);
}

export default function* orderSaga() {
  yield all([fork(watchsendEmail)]);
}
