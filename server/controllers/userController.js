const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log(req);
    return res.status(422).json({ error: "Please add all of the fields" });
  }

  const existingUser = await User.findOne({ email: email });

  try {
    if (existingUser) {
      return res
        .status(422)
        .json({ message: "User with that email already exist" });
    }
    const user = new User({
      email,
      password,
    });

    try {
      await user.save();
      return res.status(200).json({ message: "Account created successfully." });
    } catch (error) {
      if (error.name === "ValidationError") {
        return res.status(422).json({ message: error.message });
      } else {
        return res.json({ message: error.message });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Sorry, we are experiencing technical difficulties" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "Please add all of the fields" });
  }

  try {
    const savedUser = await User.findOne({ email: email });
    if (!savedUser) {
      return res.status(422).json({ message: "Invalid email or password" });
    }

    const isPasswordValid = await savedUser.comparePassword(password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: savedUser._id }, process.env.JWTSECRET);
      return res.json({ token });
    } else {
      return res.status(422).json({ error: "Invalid email or password." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const protectedRoute = async (req, res) => {
  try {
    //exclude the password from the returned data
    const user = await User.findOne(req.user._id).select("-password");
    return res.json({ user });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
  protectedRoute,
};
