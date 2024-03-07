import produce from "../util/produce";

export const initialState = {
  sendEmailLoading: false,
  sendEmailDone: false,
  sendEmailError: null,
};

export const SEND_EMAIL_REQUEST = "SEND_EMAIL_REQUEST";
export const SEND_EMAIL_SUCCESS = "SEND_EMAIL_SUCCESS";
export const SEND_EMAIL_FAILURE = "SEND_EMAIL_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SEND_EMAIL_REQUEST:
        draft.sendEmailLoading = true;
        draft.sendEmaiError = null;
        draft.sendEmailDone = false;
        break;
      case SEND_EMAIL_SUCCESS:
        draft.sendEmailLoading = false;
        draft.sendEmailDone = true;
        break;
      case SEND_EMAIL_FAILURE:
        draft.sendEmailLoading = false;
        draft.sendEamilError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
