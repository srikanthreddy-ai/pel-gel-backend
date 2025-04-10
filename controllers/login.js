const jwt = require("jsonwebtoken");
const User = require("../models/adminUser");
const bcrypt = require("bcryptjs");
const log = require("../handlers/logger");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "yourSecretKey",
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id },
      "yourRefreshSecretKey",
      { expiresIn: "7d" }
    );

    res.json({ username, token, refreshToken });
  } catch (error) {
    res.send({
      message: "Error occurred while logging in",
      error: error.message,
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    log.info("Creating user");
    const { username, password, email, role } = req.body;
    const user = await User.create({ username, password, email, role });
    if (!user) {
      return res.status(400).json({ message: "failed to create user" });
    }
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: "Username or email already exists" });
    } else {
      res.status(500).json({ error: "Server error", message: error.message });
    }
  }
};
module.exports = {
  login,
  createUser,
};
