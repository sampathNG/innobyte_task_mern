const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Otp = require("../models/Otp");
const secretKey = "secretkey";
const nodemailer = require("nodemailer");
exports.register = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const otppp = Math.floor(100000 + Math.random() * 900000);
  const otpk = otppp.toString();
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    phone: req.body.phone,
    otp: otpk,
  });
  const userr = await User.findOne({ email: req.body.email });
  if (userr) {
    return res.status(400).json({ message: "User with Email already exists" });
  }
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ramuksampath5@gmail.com",
      pass: "jnqy sspu jzhr lmeh",
    },
  });
  const mailOptions = {
    from: "ramuksampath5@gmail.com",
    to: req.body.email,
    subject: "OTP Verification",
    text: `Your OTP for verification is: ${otpk}`,
  };
  await transporter.sendMail(mailOptions);

  await user.save();
  console.log(user);
  res.json({ message: "User registered successfully" });
};
exports.otp = async (req, res) => {
  try {
    const otpRecords = await User.findOne({ otp: req.body.otp });
    console.log(req.body.otp);
    if (!otpRecords) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    res.json({ message: "OTP verified successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) {
    return res.status(400).json({ message: "Invalid email" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  console.log(validPassword);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid password" });
  }
  const token = jwt.sign(
    { userId: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48 },
    "secretkey"
  );
  res.json({ token });
};
exports.getAll = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded["userI"]);
    const users = await User.find({ userId: decoded["userId"] });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
exports.deleteUser = async (req, res) => {
  try {
    // await User.findByIdAndDelete(req.params.id);
    await User.deleteMany();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
exports.updateUser = async (req, res) => {
  try {
    const { name, phone } = req.body;
    await User.findByIdAndUpdate(req.params.id, { name, phone });
    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};
