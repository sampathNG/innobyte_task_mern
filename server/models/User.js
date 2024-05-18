const mongoose = require("mongoose");
const userSChema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  otp: {
    type: Number,
  },
});
const user = mongoose.model("User", userSChema);
module.exports = user;
