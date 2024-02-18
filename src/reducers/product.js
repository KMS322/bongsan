import produce from "../util/produce";

export const initialState = {
  loadProductsLoading: false,
  loadProductsDone: false,
  loadProductsError: null,
  products: null,
};

export const LOAD_PRODUCTS_REQUEST = "LOAD_PRODUCTS_REQUEST";
export const LOAD_PRODUCTS_SUCCESS = "LOAD_PRODUCTS_SUCCESS";
export const LOAD_PRODUCTS_FAILURE = "LOAD_PRODUCTS_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_PRODUCTS_REQUEST:
        draft.loadProductsLoading = true;
        draft.loadProductsError = null;
        draft.loadProductsDone = false;
        break;
      case LOAD_PRODUCTS_SUCCESS:
        draft.loadProductsLoading = false;
        draft.products = action.data;
        draft.loadProductsDone = true;
        break;
      case LOAD_PRODUCTS_FAILURE:
        draft.loadProductsLoading = false;
        draft.loadProductsError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
