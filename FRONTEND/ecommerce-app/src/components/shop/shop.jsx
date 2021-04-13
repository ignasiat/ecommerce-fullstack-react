import React, { useEffect } from 'react';
import './shop.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  loadProductsApi, addItemToCart, removeItemFromCart, clearCart, checkoutCart
} from '../../redux/actions/cartActionCreators';
import constants from '../../constants';

function Shop({ cart, actions }) {
  useEffect(() => {
    actions.loadProductsApi();
  }, []);
  return (
    <main>
      <div className="card">
        <section className="card-list">

          {(cart.products && cart.products.length > 0) ? cart.products.map((product) => (
            <div className="card-item" key={product._id}>
              <div className="card-item__product">{`${product.name} ${product.format.name}`}</div>
              <div className="card-item__price">
                {product.price.toFixed(2)}
                {' '}
                {constants.EURO_SIGN}
              </div>
              <div className="card-item__quantity">
                <button type="button" onClick={() => actions.removeItemFromCart(product._id)}>{constants.MINUS_SIGN}</button>
                <input type="number" value={product.cart} readOnly />
                <button type="button" onClick={() => actions.addItemToCart(product._id)}>{constants.PLUS_SIGN}</button>
              </div>
            </div>
          ))
            : (<></>)}

        </section>
      </div>
      <section className="card-summary">
        <div className="card-summary__top">
          <div>
            {constants.MY_CART}
          </div>
          <div className="summary-clear">
            <button type="button" onClick={() => actions.clearCart()}>{constants.EMPTY_CART}</button>
          </div>
        </div>
        <hr />
        <div className="card-summary__bottom">
          <div className="total">
            <span className="total__title">{constants.TOTAL}</span>
            <span className="total__items">
              {cart.totalItems}
              {' '}
              {constants.PRODUCTS}
            </span>
          </div>
          <div className="buy">
            <button type="button" onClick={() => actions.checkoutCart(cart)}>{constants.BUY}</button>
          </div>
          <div className="total__price">
            {cart.totalCart && Math.abs(cart.totalCart).toFixed(2)}
            €
          </div>
        </div>
      </section>
    </main>
  );
}

Shop.propTypes = {
  cart: PropTypes.shape({
    totalCart: PropTypes.number,
    totalItems: PropTypes.number,
    products: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string,
      stock: PropTypes.number,
      price: PropTypes.number,
      image: PropTypes.string
    }))
  }).isRequired,
  actions: PropTypes.shape({
    loadProductsApi: PropTypes.func.isRequired,
    addItemToCart: PropTypes.func.isRequired,
    removeItemFromCart: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    checkoutCart: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ cart }) {
  return {
    cart
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      loadProductsApi,
      addItemToCart,
      removeItemFromCart,
      clearCart,
      checkoutCart
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Shop);
