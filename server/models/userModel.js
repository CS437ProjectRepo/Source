const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    validate: {
      validator: function (email) {
        return /[^@]+@[^@]+\.[^@]+/.test(email);
        // return /^[a-zA-Z0-9._%+-]+@bu\.edu$/.test(email);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    require: true,
    trim: true,
    validate: {
      validator: function (password) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
          password
        );
      },
      message:
        "Password must be at least 6 characters long and contain at least one capital letter, one number, and one special character",
    },
  },
});

//Hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  /*
    Checks to see if the password field has been modified 
    if no modifcations have been made move on to the next middleware
    */
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(this.password, salt);
    this.password = hashPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};

mongoose.model("User", userSchema);
