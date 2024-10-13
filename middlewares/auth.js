const { verifyToken } = require("../services/auth");

function checkForAuth(req, res, next) {
  console.log("Cookies", req.cookies);
  const token = req.cookies.token;

  if (!token) {
    console.log("No cookie found");
    return next();
  }
  try {
    const user = verifyToken(token);
    req.user = user;
    console.log(user.name);
    next();
  } catch (err) {
    console.log("Cannot authenticate", err);
    next();
  }
}

module.exports = {
  checkForAuth,
};
