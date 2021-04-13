const Product = require('../models/productModel');
const Format = require('../models/formatModel');

function createProduct(req, res) {
  const newProduct = new Product(req.body);

  newProduct.save();

  res.json(newProduct);
}

async function getAllProducts(req, res) {
  const allProducts = await Product
    .find({})
    .populate('format');

  res.json(allProducts);
}

async function getProductById(req, res) {
  const { idProduct } = req.params;

  try {
    const foundProduct = await Product
      .findById(idProduct)
      .populate('format');
    res.status(200);
    res.json(foundProduct);
  } catch (error) {
    res.status(500);
    res.send(`Error finding product ${error}`);
  }
}

async function updateProductById(req, res) {
  const { idProduct } = req.params;

  try {
    const updatedProduct = await Product
      .findByIdAndUpdate(idProduct, req.body, { new: true })
      .populate('format');
    res.status(200);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500);
    res.send(`Error updating product ${error}`);
  }
}

async function deleteProductById(req, res) {
  const { idProduct } = req.params;

  try {
    const deletedProduct = await Product
      .findByIdAndDelete(idProduct)
      .populate('format');
    res.status(200);
    res.json(deletedProduct);
  } catch (error) {
    res.status(500);
    res.send(`Error deleting product ${error}`);
  }
}

async function getAllFormat(req, res) {
  const allFormats = await Format
    .find({});

  res.json(allFormats);
}

module.exports = {
  createProduct, getAllProducts, getProductById, updateProductById, deleteProductById, getAllFormat
};
