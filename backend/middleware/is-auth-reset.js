const jwt = require("jsonwebtoken");
const config = require("../config");

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 403;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  console.log(token);
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, config.tokenkey);
  } catch (err) {
    err.statusCode = 502;
    throw err;
  }
  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  req.email = decodedToken.email;
  req.type = decodedToken.type;
  req.userType = decodedToken.userType;
  if (req.type != "reset") {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;
    throw error;
  }
  next();
};
