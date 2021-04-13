import cartActionTypes from '../actions/cartActionTypes';

export default function cartReducer(state = {}, action) {
  const dataState = { ...state };
  switch (action.type) {
    case cartActionTypes.LOAD_PRODUCTS_API:
      return {
        totalCart: 0,
        totalItems: 0,
        products: action.products.map((product) => ({ ...product, cart: 0 }))
      };
    case cartActionTypes.ADD_ITEM:
      dataState.products = dataState.products.map((product) => {
        if (product._id === action.idProduct && product.stock > product.cart) {
          dataState.totalItems += 1;
          dataState.totalCart += product.price;
          return { ...product, cart: product.cart + 1 };
        }
        return product;
      });
      return dataState;
    case cartActionTypes.REMOVE_ITEM:
      dataState.products = dataState.products.map((product) => {
        if (product._id === action.idProduct && product.cart > 0) {
          dataState.totalItems -= 1;
          dataState.totalCart -= product.price;
          return { ...product, cart: product.cart - 1 };
        }
        return product;
      });
      return dataState;
    case cartActionTypes.CLEAR_CART:
      dataState.products = dataState.products.map((product) => ({ ...product, cart: 0 }));
      dataState.totalItems = 0;
      dataState.totalCart = 0;
      return dataState;
    case cartActionTypes.BUY_CART:
      dataState.products = dataState.products.map((product) => {
        if (product._id === action.product._id) {
          return { ...action.product, cart: 0 };
        }
        return product;
      });
      dataState.totalItems = 0;
      dataState.totalCart = 0;
      return dataState;
    default:
      return { ...state };
  }
}
