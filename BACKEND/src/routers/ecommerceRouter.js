const { Router } = require('express');

const ecommerceController = require('../controllers/ecommerceController');

function EcommerceRouter() {
  const router = Router();

  router
    .route('/')
    .post(ecommerceController.createProduct)
    .get(ecommerceController.getAllProducts);

  router
    .route('/format')
    .get(ecommerceController.getAllFormat);

  router
    .route('/:idProduct')
    .get(ecommerceController.getProductById)
    .put(ecommerceController.updateProductById)
    .delete(ecommerceController.deleteProductById);

  return router;
}

module.exports = EcommerceRouter();
