import axios from 'axios';
import cartActionTypes from './cartActionTypes';
import constant from '../../constants';

export function loadProductsApi() {
  return async (dispatch) => {
    const { data } = await axios.get(constant.URL_API);
    dispatch({
      type: cartActionTypes.LOAD_PRODUCTS_API,
      products: data
    });
  };
}

export function clearCart() {
  return {
    type: cartActionTypes.CLEAR_CART
  };
}

export function addItemToCart(idProduct) {
  return {
    type: cartActionTypes.ADD_ITEM,
    idProduct
  };
}

export function removeItemFromCart(idProduct) {
  return {
    type: cartActionTypes.REMOVE_ITEM,
    idProduct
  };
}

export function checkoutCart(cart) {
  return (dispatch) => {
    cart.products.forEach(async (product) => {
      if (product.cart !== 0) {
        const { data } = await axios.put(`${constant.URL_API}/${product._id}`, { stock: product.stock - product.cart });
        dispatch({
          type: cartActionTypes.BUY_CART,
          product: data
        });
      }
    });
  };
}
