import produce from "../util/produce";

export const initialState = {
  loadReviewsLoading: false,
  loadReviewsDone: false,
  loadReviewsError: null,
  reviews: null,
};

export const LOAD_REVIEWS_REQUEST = "LOAD_REVIEWS_REQUEST";
export const LOAD_REVIEWS_SUCCESS = "LOAD_REVIEWS_SUCCESS";
export const LOAD_REVIEWS_FAILURE = "LOAD_REVIEWS_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_REVIEWS_REQUEST:
        draft.loadReviewsLoading = true;
        draft.loadReviewsError = null;
        draft.loadReviewsDone = false;
        break;
      case LOAD_REVIEWS_SUCCESS:
        draft.loadReviewsLoading = false;
        draft.reviews = action.data;
        draft.loadReviewsDone = true;
        break;
      case LOAD_REVIEWS_FAILURE:
        draft.loadReviewsLoading = false;
        draft.loadReviewsError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
