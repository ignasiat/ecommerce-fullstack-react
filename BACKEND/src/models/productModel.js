const { model, Schema } = require('mongoose');

const productSchema = new Schema({
  name: String,
  stock: Number,
  price: Number,
  image: String,
  format: { type: Schema.Types.ObjectId, ref: 'Format' }
});

module.exports = model('Product', productSchema);
