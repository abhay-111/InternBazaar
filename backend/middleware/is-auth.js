const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 502;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.tokenkey);
  } catch (err) {
    err.statusCode = 502;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 502;
    throw error;
  }
  req.userId = decodedToken.userId;
  req.userType = decodedToken.userType;
  // console.log("yess token" + req.userId);
  next();
};
