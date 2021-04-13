import productActionTypes from '../actions/productsActionTypes';

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case productActionTypes.LOAD_PRODUCTS_API:
      return [...action.products];
    case productActionTypes.DELETE_PRODUCT_API:
      return [...state].filter((product) => product._id !== action.product._id);
    case productActionTypes.ADD_PRODUCT_API:
      return [...state, action.product];
    case productActionTypes.UPDATE_PRODUCT_API:
      return [...state].map((product) => {
        if (product._id === action.product._id) {
          return action.product;
        }
        return product;
      });
    default:
      return [...state];
  }
}
