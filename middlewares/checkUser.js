const JWT = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_Secret;
const { createCustomError } = require("../errors/customError");

const checkUser = async (req, res, next) => {
  const { auth_token: token } = req.headers;
  if (!token) {
           createCustomError(401, "Please enter authorization token");
  }
  try {
    const decodedUser = JWT.verify(token, JWT_Secret);
    req.user = decodedUser.user;
    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = checkUser;
