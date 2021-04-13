import { combineReducers } from 'redux';
import products from './productsReducer';
import formats from './formatReducer';
import cart from './cartReducer';

const rootReducer = combineReducers({
  products,
  formats,
  cart
});

export default rootReducer;
