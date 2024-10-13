const jwt = require("jsonwebtoken");
const secretKey = "Ayush@123";

function createUserToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImage: user.profileImage,
    role: user.role,
  };
  const token = jwt.sign(payload, secretKey);
  return token;
}

function verifyToken(token) {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (err) {
    throw new Error("Invalid token");
  }
}

module.exports = {
  createUserToken,
  verifyToken,
};
