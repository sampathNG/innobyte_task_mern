const jwt = require("jsonwebtoken");
const secretKey = "secretkey";
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid token" });
  }
};
module.exports = verifyToken;
