const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const {MESSAGES , HTTP_STATUS_CODES} = require("../utils/server.constants");

const requireLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ error: MESSAGES.NOT_LOGGED_IN });
    }

    const token = authorization.replace("Bearer ", "");
    const payload = await jwt.verify(token, process.env.JWTSECRET);
    const user = await User.findById(payload._id);

    if (!user) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ error: MESSAGES.NOT_LOGGED_IN });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};
module.exports = requireLogin;
