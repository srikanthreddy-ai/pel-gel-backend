const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "hr", "supervisor"],
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving the user document
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // If password isn't modified, move to next middleware

  const salt = await bcrypt.genSalt(10); // Generate a salt
  this.password = await bcrypt.hash(this.password, salt); // Hash the password
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
