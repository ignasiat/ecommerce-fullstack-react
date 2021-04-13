import axios from 'axios';
import productActionTypes from './productsActionTypes';
import constant from '../../constants';

export function loadProductsApi() {
  return async (dispatch) => {
    const { data } = await axios.get(constant.URL_API);
    dispatch({
      type: productActionTypes.LOAD_PRODUCTS_API,
      products: data
    });
  };
}

export function deleteProductApi(idProduct) {
  return async (dispatch) => {
    const { data } = await axios.delete(`${constant.URL_API}/${idProduct}`);
    dispatch({
      type: productActionTypes.DELETE_PRODUCT_API,
      product: data
    });
  };
}

export function addProductApi(product) {
  if (product._id) {
    const productToUpdate = { ...product };
    delete productToUpdate._id;
    delete productToUpdate.button;
    return async (dispatch) => {
      const { data } = await axios.put(`${constant.URL_API}/${product._id}`, productToUpdate);
      dispatch({
        type: productActionTypes.UPDATE_PRODUCT_API,
        product: data
      });
    };
  }
  return async (dispatch) => {
    const { data } = await axios.post(constant.URL_API, product);
    dispatch({
      type: productActionTypes.ADD_PRODUCT_API,
      product: data
    });
  };
}
