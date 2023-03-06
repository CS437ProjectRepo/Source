const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const requireLogin = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "you must be logged in" });
    }
    
    const token = authorization.replace("Bearer ", "");
    const payload = await jwt.verify(token, process.env.JWTSECRET);
    const user = await User.findById(payload._id);

    if (!user) {
      return res.status(401).json({ error: "you must be logged in" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
};
module.exports = requireLogin