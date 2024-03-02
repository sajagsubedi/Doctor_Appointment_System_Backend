const JWT = require("jsonwebtoken");
const JWT_Secret = process.env.JWT_Secret;
const User = require("../models/User");
const { createCustomError } = require("../errors/customError");

const checkDoctor = async (req, res, next) => {
  const { auth_token: token } = req.headers;
  if (!token) {
    createCustomError(401, "Please enter authorization token");
  }
  try {
    const decodedUser = JWT.verify(token, JWT_Secret);
    const foundUser = await User.findOne({
      _id: decodedUser.user.id,
    });
    if (foundUser.type !== "doctor") {
      createCustomError(403, "Request denied!");
    }
    req.user = decodedUser.user;
    next();
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = checkDoctor;
