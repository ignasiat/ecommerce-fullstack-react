const { model, Schema } = require('mongoose');

const formatSchema = new Schema({
  name: String
});

module.exports = model('Format', formatSchema);
