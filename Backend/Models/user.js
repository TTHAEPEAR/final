const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },

});

module.exports = mongoose.model('User', userSchema);//(ต้องการให้เรียกว่าอะไร , ตัวแปรที่ตั้งไว้)