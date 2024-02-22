import produce from "../util/produce";

export const initialState = {
  addCartLoading: false,
  addCartDone: false,
  addCartError: null,
  loadCartLoading: false,
  loadCartDone: false,
  loadCartError: null,
  cartLists: null,
};

export const ADD_CART_REQUEST = "ADD_CART_REQUEST";
export const ADD_CART_SUCCESS = "ADD_CART_SUCCESS";
export const ADD_CART_FAILURE = "ADD_CART_FAILURE";

export const LOAD_CART_REQUEST = "LOAD_CART_REQUEST";
export const LOAD_CART_SUCCESS = "LOAD_CART_SUCCESS";
export const LOAD_CART_FAILURE = "LOAD_CART_FAILURE";

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case ADD_CART_REQUEST:
        draft.addCartLoading = true;
        draft.addCartError = null;
        draft.addCartDone = false;
        break;
      case ADD_CART_SUCCESS:
        draft.addCartLoading = false;
        draft.products = action.data;
        draft.addCartDone = true;
        break;
      case ADD_CART_FAILURE:
        draft.addCartLoading = false;
        draft.addCartError = action.error;
        break;
      case LOAD_CART_REQUEST:
        draft.loadCartLoading = true;
        draft.loadCartError = null;
        draft.loadCartDone = false;
        break;
      case LOAD_CART_SUCCESS:
        draft.loadCartLoading = false;
        draft.cartLists = action.data;
        draft.loadCartDone = true;
        break;
      case LOAD_CART_FAILURE:
        draft.loadCartLoading = false;
        draft.loadCartError = action.error;
        break;
      default:
        return state;
    }
  });
};

export default reducer;
