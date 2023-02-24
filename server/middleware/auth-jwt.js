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
    const { _id } = payload;
    const user = await User.findById(_id);

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

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization) {
//   }

//   //authorization will be formatted as "Bearer feahfioeaiofho89432"
//   //remove the "Bearer " and only the jwt will be left
//   const token = authorization.replace("Bearer ", "");

//   jwt.verify(token, process.env.JWTSECRET, (err, payload) => {
//     if (err) {
//       return res.status(401).json({ error: "you must be logged in" });
//     }

//     const { _id } = payload;
//     User.findById(_id).then((userdata) => {
//       req.user = userdata;
//       next();
//     });
//   });
// };
