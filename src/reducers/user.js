import produce from "../util/produce";

export const initialState = {
  loadUserLoading: false,
  loadUserDone: false,
  loadUserError: null,
  logInLoading: false,
  logInDone: false,
  logInError: null,
  logOutLoading: false,
  logOutDone: false,
  logOutError: null,
  signUpLoading: false,
  signUpDone: false,
  signUpError: null,
  checkIdLoading: false,
  checkIdDone: false,
  checkIdError: null,
  changePasswordLoading: false,
  changePasswordDone: false,
  changePasswordError: null,
  me: null,
  signUpData: {},
  loginData: {},
};

export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAUILURE";

export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAUILURE";

export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAUILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAUILURE";

export const CHECK_ID_REQUEST = "CHECK_ID_REQUEST";
export const CHECK_ID_SUCCESS = "CHECK_ID_SUCCESS";
export const CHECK_ID_FAILURE = "CHECK_ID_FAUILURE";

export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAUILURE";

export const ADD_RESUME_TO_ME = "ADD_RESUME_TO_ME";
export const ADD_CAREER_TO_ME = "ADD_CAREER_TO_ME";
export const ADD_APPLICATION_TO_ME = "ADD_APPLICATION_TO_ME";
export const ADD_RECRUITMENT_TO_ME = "ADD_RECRUITMENT_TO_ME";

export const REMOVE_RESUME_OF_ME = "REMOVE_RESUME_OF_ME";
export const REMOVE_CAREER_OF_ME = "REMOVE_CAREER_OF_ME";
export const REMOVE_APPLICATION_OF_ME = "REMOVE_APPLICATION_OF_ME";
export const REMOVE_RECRUITMENT_OF_ME = "REMOVE_RECRUITMENT_OF_ME";

export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
export const signupRequestAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};
export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_MY_INFO_REQUEST:
        draft.loadUserLoading = true;
        draft.loadUserError = null;
        draft.loadUserDone = false;
        break;
      case LOAD_MY_INFO_SUCCESS:
        draft.loadUserLoading = false;
        draft.me = action.data;
        draft.loadUserDone = true;
        break;
      case LOAD_MY_INFO_FAILURE:
        draft.loadUserLoading = false;
        draft.loadUserError = action.error;
        break;
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.me = action.data;
        draft.logInDone = true;
        break;
      case LOG_IN_FAILURE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILURE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILURE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;
      case CHECK_ID_REQUEST:
        draft.checkIdLoading = true;
        draft.checkIdError = null;
        draft.checkIdDone = false;
        break;
      case CHECK_ID_SUCCESS:
        draft.checkIdLoading = false;
        draft.checkIdDone = true;
        break;
      case CHECK_ID_FAILURE:
        draft.checkIdLoading = false;
        draft.checkIdDone = false;
        draft.checkIdError = action.error;
        break;
      case CHANGE_PASSWORD_REQUEST:
        draft.changePasswordLoading = true;
        draft.changePasswordError = null;
        draft.changePasswordDone = false;
        break;
      case CHANGE_PASSWORD_SUCCESS:
        draft.changePasswordLoading = false;
        draft.changePasswordDone = true;
        break;
      case CHANGE_PASSWORD_FAILURE:
        draft.changePasswordLoading = false;
        draft.changePasswordError = action.error;
        break;
      case ADD_RESUME_TO_ME:
        draft.me.resumes.unshift({ id: action.data });
        break;
      case ADD_CAREER_TO_ME:
        draft.me.careers.unshift({ id: action.data });
        break;
      case ADD_APPLICATION_TO_ME:
        draft.me.applications.unshift({ id: action.data });
        break;
      case ADD_RECRUITMENT_TO_ME:
        draft.me.recruitments.unshift({ id: action.data });
        break;
      case REMOVE_RESUME_OF_ME:
        draft.me.resumes = draft.me.resumes.filter((v) => v.id !== action.data);
        break;
      case REMOVE_CAREER_OF_ME:
        draft.me.careers = draft.me.careers.filter((v) => v.id !== action.data);
        break;
      case REMOVE_APPLICATION_OF_ME:
        draft.me.applications = draft.me.applications.filter(
          (v) => v.id !== action.data
        );
        break;
      case REMOVE_RECRUITMENT_OF_ME:
        draft.me.recruitments = draft.me.recruitments.filter(
          (v) => v.id !== action.data
        );
        break;
      default:
        return state;
    }
  });
};

export default reducer;
