const mongoose = require('mongoose');

const sweetSchema = new mongoose.Schema({
  sweetId: { type: Number, unique: true, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('Sweet', sweetSchema);
