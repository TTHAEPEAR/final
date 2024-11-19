const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  bidderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model('Item', itemSchema);
