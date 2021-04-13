import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import {
  loadProductsApi, deleteProductApi, addProductApi
} from '../../redux/actions/productsActionCreators';
import loadFormatApi from '../../redux/actions/formatActionCreators';
import constants from '../../constants';
import './productList.scss';

function ProductList({ products, formats, actions }) {
  const [data, setData] = useState({ button: constants.ADD });

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
  };

  useEffect(() => {
    actions.loadProductsApi();
    actions.loadFormatApi();
  }, [products.length]);

  return (
    <main>
      <h1>{constants.PRODUCTS.toUpperCase()}</h1>

      {(products.length > 0)
        ? products.map((product) => (
          <div key={product._id} className="product-item">
            <div className="product-item__title">
              {product.name}
            </div>
            <div className="product-item__action">
              <button type="button" key={`delete${product._id}`} onClick={() => actions.deleteProductApi(product._id)}>{constants.ERASE}</button>
            </div>
            <div className="product-item__action">
              <button type="button" key={`update${product._id}`} onClick={() => setData({ ...product, button: constants.UPDATE })}>{constants.UPDATE}</button>
            </div>
          </div>
        ))
        : (<div>{constants.NO_PRODUCT}</div>)}
      <div className="product-flex">
        <label htmlFor="name">
          {' '}
          {constants.NAME}
          :
          {' '}
        </label>
        <input id="name" name="name" type="text" value={data.name} onChange={handleInputChange} required />

      </div>
      <div className="product-flex">
        <label htmlFor="stock">
          {' '}
          {constants.STOCK}
          :
          {' '}
        </label>
        <input id="stock" name="stock" type="number" value={data.stock} onChange={handleInputChange} required />
        <label htmlFor="price">
          {' '}
          {constants.PRICE}
          :
          {' '}
        </label>
        <input id="price" name="price" type="number" step=".01" value={data.price} onChange={handleInputChange} required />
      </div>
      <div className="product-flex">
        <label htmlFor="image">
          {' '}
          {constants.IMAGE_URL}
          :
          {' '}
        </label>
        <input id="image" name="image" type="text" value={data.image} onChange={handleInputChange} required />
      </div>
      <div className="product-flex">
        <label htmlFor="format">
          {constants.FORMAT}
          :
        </label>
        <select name="format" id="format" value={data.format} onChange={handleInputChange}>
          <option selected disabled>{constants.SELECT_FORMAT}</option>
          {(formats.length > 0)
            ? formats.map((myFormat) => (
              <option key={myFormat._id} value={myFormat._id}>
                {myFormat.name}
              </option>
            ))
            : <></>}
        </select>
        <button
          type="button"
          onClick={() => actions.addProductApi(data)}
        >
          {data.button}
        </button>
      </div>
    </main>
  );
}

ProductList.propTypes = {

  products: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })).isRequired,
  formats: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string
  })).isRequired,
  actions: PropTypes.shape({
    loadProductsApi: PropTypes.func.isRequired,
    deleteProductApi: PropTypes.func.isRequired,
    loadFormatApi: PropTypes.func.isRequired,
    addProductApi: PropTypes.func.isRequired
  }).isRequired
};

function mapStateToProps({ products, formats }) {
  return {
    products, formats
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      loadProductsApi,
      deleteProductApi,
      loadFormatApi,
      addProductApi
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
