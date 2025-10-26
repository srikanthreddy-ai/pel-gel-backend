const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
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
    enum: [],
    required: true,
    default: 'hr'
  },
   privileges: {
    type: [String], // Or a more detailed schema if needed
    default: [],
  },
  isActive: {
    type: Boolean,
    default: true,
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

UserSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (!update.password && !(update.$set && update.$set.password)) {
    return next();
  }
  const password = update.password || update.$set.password;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    if (update.password) {
      update.password = hashedPassword;
    } else {
      update.$set.password = hashedPassword;
    }

    this.setUpdate(update);
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
