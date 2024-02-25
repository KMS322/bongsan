import produce from "../util/produce";

export const initialState = {
  addProductLoading: false,
  addProductDone: false,
  addProductError: null,
  deleteProductLoading: false,
  deleteProductDone: false,
  deleteProductError: null,
  addReviewLoading: false,
  addReviewDone: false,
  addReviewError: null,
  deleteReviewLoading: false,
  deleteReviewDone: false,
  deleteReviewError: null,
};

export const ADD_PRODUCT_REQUEST = "ADD_PRODUCT_REQUEST";
export const ADD_PRODUCT_SUCCESS = "ADD_PRODUCT_SUCCESS";
export const ADD_PRODUCT_FAILURE = "ADD_PRODUCT_FAILURE";

export const DELETE_PRODUCT_REQUEST = "DELETE_PRODUCT_REQUEST";
export const DELETE_PRODUCT_SUCCESS = "DELETE_PRODUCT_SUCCESS";
export const DELETE_PRODUCT_FAILURE = "DELETE_PRODUCT_FAILURE";

export const ADD_REVIEW_REQUEST = "ADD_REVIEW_REQUEST";
export const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";
export const ADD_REVIEW_FAILURE = "ADD_REVIEW_FAILURE";

export const DELETE_REVIEW_REQUEST = "DELETE_REVIEW_REQUEST";
export const DELETE_REVIEW_SUCCESS = "DELETE_REVIEW_SUCCESS";
export const DELETE_REVIEW_FAILURE = "DELETE_REVIEW_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_PRODUCT_REQUEST:
        draft.addProductLoading = true;
        draft.addProductError = null;
        draft.addProductDone = false;
        break;
      case ADD_PRODUCT_SUCCESS:
        draft.addProductLoading = false;
        draft.addProductDone = true;
        break;
      case ADD_PRODUCT_FAILURE:
        draft.addProductLoading = false;
        draft.addProductError = action.error;
        break;
      case DELETE_PRODUCT_REQUEST:
        draft.deleteProductLoading = true;
        draft.deleteProductError = null;
        draft.deleteProductDone = false;
        break;
      case DELETE_PRODUCT_SUCCESS:
        draft.deleteProductLoading = false;
        draft.deleteProductDone = true;
        break;
      case DELETE_PRODUCT_FAILURE:
        draft.deleteProductLoading = false;
        draft.deleteProductError = action.error;
        break;
      case ADD_REVIEW_REQUEST:
        draft.addReviewLoading = true;
        draft.addReviewError = null;
        draft.addReviewDone = false;
        break;
      case ADD_REVIEW_SUCCESS:
        draft.addReviewLoading = false;
        draft.addReviewDone = true;
        break;
      case ADD_REVIEW_FAILURE:
        draft.addReviewLoading = false;
        draft.addReviewError = action.error;
        break;
      case DELETE_REVIEW_REQUEST:
        draft.deleteReviewLoading = true;
        draft.deleteReviewError = null;
        draft.deleteReviewDone = false;
        break;
      case DELETE_REVIEW_SUCCESS:
        draft.deleteReviewLoading = false;
        draft.deleteReviewDone = true;
        break;
      case DELETE_REVIEW_FAILURE:
        draft.deleteReviewLoading = false;
        draft.deleteReviewError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
