const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  createdAt: { type: Date, expires: "2m", default: Date.now },
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});
const OTP = mongoose.model("OTP", otpSchema);
module.exports = OTP;
