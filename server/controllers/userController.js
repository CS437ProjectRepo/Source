const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User = mongoose.model("User");
const {MESSAGES, HTTP_STATUS_CODES} = require("../utils/server.constants");

const register = async (req, res) => {
  const { email, password, adminCode} = req.body;
  if (!email || !password || !adminCode) {
    return res
      .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ message: MESSAGES.FIELDS_MISSING });
  }

  //TODO: add to server.constants
  if(adminCode != process.env.ADMIN_CODE){
    return res
    .status(HTTP_STATUS_CODES.UNAUTHORIZED)
    .json({ message: MESSAGES.INVALID_ADMIN_CODE});
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
          .json({ message: error.message, name: "ValidationError"});
      } else {
        return res
          .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
          .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
      }
    }
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY)
      .json({ message: MESSAGES.FIELDS_MISSING });
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
        .json({ message: MESSAGES.INVALID_CREDENTIALS });
    }
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const protectedRoute = async (req, res) => {
  try {
    //exclude the password from the returned data
    const user = await User.findOne(req.user._id).select("-password");
    return res.json({
      email: user.email,
      secretAdminCode: process.env.ADMIN_CODE, 
    });
  } catch (error) {
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if(!oldPassword || !newPassword){
    return res.status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: MESSAGES.INVALID_CREDENTIALS });
  }

  try {
    const user = await User.findById(req.user._id);

    const isPasswordValid = await user.comparePassword(oldPassword);
    if (!isPasswordValid) {
      // console.log(req.user._id)
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: "Invalid Password"});
    }

    user.password = newPassword;
    await user.save();

    return res
      .status(HTTP_STATUS_CODES.OK)
      .json({ message: MESSAGES.PASSWORD_CHANGED });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: error.message, name: "ValidationError"});
    }
    return res
      .status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR)
      .json({ message: MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const forgotPassword = async(req, res) => {
  const email = req.body
  if(!email){
    return res.status(HTTP_STATUS_CODES.UNAUTHORIZED)
      .json({ message: MESSAGES.INVALID_CREDENTIALS });
  }

  try{
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      return res
        .status(HTTP_STATUS_CODES.UNAUTHORIZED)
        .json({ message: MESSAGES.INVALID_CREDENTIALS });
    }

    // const token = jwt.sign({ _id: savedUser._id }, process.env.JWTSECRET, {
    //   expiresIn: "5m",
    // });

  }catch(error){
    return res.status(400).json({message: error.message})
  }
}

module.exports = {
  register,
  login,
  protectedRoute,
  changePassword,
  forgotPassword
};