const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const {MESSAGES, HTTP_STATUS_CODES} = require("../utils/server.constants");

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ error: MESSAGES.FIELDS_MISSING });
  }

  const existingUser = await User.findOne({ email: email });

  try {
    if (existingUser) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
        .json({ message: MESSAGES.EMAIL_ALREADY_EXIST });
    }
    const user = new User({
      email,
      password,
    });

    try {
      await user.save();
      return res
        .status(HTTP_STATUS_CODES.OK)
        .json({ message: MESSAGES.ACCOUNT_CREATED });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res
          .status(HTTP_STATUS_CODES.UNAUTHORIZED)
          .json({ message: MESSAGES.INVALID_CREDENTIALS });
      } else {
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
      }
    }
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ error: MESSAGES.FIELDS_MISSING });
  }

  try {
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: MESSAGES.INVALID_CREDENTIALS });
    }

    const isPasswordValid = await savedUser.comparePassword(password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: savedUser._id }, process.env.JWTSECRET);
      return res
        .status(HTTP_STATUS_CODES.OK)
        .json({ token });
    } else {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ error: MESSAGES.INVALID_CREDENTIALS });
    }
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const protectedRoute = async (req, res) => {
  try {
    //exclude the password from the returned data
    const user = await User.findOne(req.user._id).select("-password");
    return res.json({ user });
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ error: MESSAGES.internalServerError });
  }
};

module.exports = {
  register,
  login,
  protectedRoute,
};