const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  }
}, { versionKey: false }); // ปิดการใช้งานฟิลด์ __v

const User = mongoose.model('User', userSchema);

module.exports = User;
