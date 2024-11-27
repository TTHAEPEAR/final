const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  detail: { type: String },
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, default: 0 },
  bidderId: { type: String, required:false },
  endTime: { type: Date, required: true },
  image:{ type:String , required:false},
});

module.exports = mongoose.model('Item', itemSchema);//(ต้องการให้เรียกว่าอะไร , ตัวแปรที่ตั้งไว้)