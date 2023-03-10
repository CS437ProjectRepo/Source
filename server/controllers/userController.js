const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");
<<<<<<< HEAD
const {MESSAGES, HTTP_STATUS_CODES} = require("../constants");
=======
const HTTP_STATUS_CODES = require("../utils/statusCodes");
const MESSAGES = require("../utils/messages");
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
<<<<<<< HEAD
      .json({ error: MESSAGES.FIELDS_MISSING });
=======
      .json({ error: MESSAGES.fieldsMissing });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
  }

  const existingUser = await User.findOne({ email: email });

  try {
    if (existingUser) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
<<<<<<< HEAD
        .json({ message: MESSAGES.EMAIL_ALREADY_EXIST });
=======
        .json({ message: MESSAGES.emailAlreadyExist });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
    }
    const user = new User({
      email,
      password,
    });

    try {
      await user.save();
      return res
        .status(HTTP_STATUS_CODES.OK)
<<<<<<< HEAD
        .json({ message: MESSAGES.ACCOUNT_CREATED });
=======
        .json({ message: MESSAGES.accountCreated });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
    } catch (error) {
      if (error.name === "ValidationError") {
        return res
          .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
<<<<<<< HEAD
          .json({ message: MESSAGES.INVALID_CREDENTIALS });
      } else {
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
=======
          .json({ message: MESSAGES.userValidationError });
      } else {
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ error: MESSAGES.internalServerError });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
      }
    }
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
<<<<<<< HEAD
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
=======
      .json({ error: MESSAGES.internalServerError });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
<<<<<<< HEAD
      .json({ error: MESSAGES.FIELDS_MISSING });
=======
      .json({ error: MESSAGES.fieldsMissing });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
  }

  try {
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
<<<<<<< HEAD
        .json({ message: MESSAGES.FIELDS_MISSING });
=======
        .json({ message: MESSAGES.fieldsMissing });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
    }

    const isPasswordValid = await savedUser.comparePassword(password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: savedUser._id }, process.env.JWTSECRET);
      return res.json({ token });
    } else {
      return res
        .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
<<<<<<< HEAD
        .json({ error: MESSAGES.FIELDS_MISSING });
=======
        .json({ error: MESSAGES.fieldsMissing });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
    }
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
<<<<<<< HEAD
      .json({ error: MESSAGES.INTERNAL_SERVER_ERROR });
=======
      .json({ error: MESSAGES.internalServerError });
>>>>>>> 11f52a1... Add HTTP status code file and a Messages file for a single location updatable location
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
