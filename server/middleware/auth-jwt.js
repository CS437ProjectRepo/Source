const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
<<<<<<< HEAD
const {MESSAGES , HTTP_STATUS_CODES} = require("../constants");
=======
const HTTP_STATUS_CODES = require("../utils/statusCodes");
const MESSAGES = require("../utils/messages");
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location

const requireLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
<<<<<<< HEAD
        .json({ error: MESSAGES.NOT_LOGGED_IN });
=======
        .json({ error: MESSAGES.notLoggedIn });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
    }

    const token = authorization.replace("Bearer ", "");
    const payload = await jwt.verify(token, process.env.JWTSECRET);
    const user = await User.findById(payload._id);

    if (!user) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
<<<<<<< HEAD
        .json({ error: MESSAGES.NOT_LOGGED_IN });
=======
        .json({ error: MESSAGES.notLoggedIn });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
<<<<<<< HEAD
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
=======
      .json({ error: MESSAGES.internalServerError });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
  }
};
module.exports = requireLogin;