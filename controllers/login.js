const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const log = require("../handlers/logger");

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      "yourSecretKey",
      { expiresIn: "2h" }
    );
    const refreshToken = jwt.sign(
      { userId: user._id, username: user.username },
      "yourRefreshSecretKey",
      { expiresIn: "7d" }
    );

    res.json({ username, token, refreshToken, role: user.role, privileges: user.privileges });
  } catch (error) {
    res.status(500).send({
      message: "Error occurred while logging in",
      error: error.message,
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    log.info("Creating user");
    const { username, password, email, role, privileges } = req.body;
    const user = await User.create({ username, password, email, role, privileges });
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
const getUsers = async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  try {
    const total = await User.countDocuments(); // Efficient count
    const totalPages = Math.ceil(total / limit);
    const users = await User.find()
      .select('-password') // Exclude password
      .skip((page - 1) * limit)
      .limit(limit);
    res.status(200).json({
      status: true,
      totalItems: total,
      totalPages,
      currentPage: page,
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const userUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await User.findByIdAndUpdate(id,
      req.body,
      { new: true });
    if (!users) {
      return res.status(404).send({
        status: false,
        message: "User not found",
      });
    }

    res.status(200).send({
      status: true,
      message: "User updated successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};
module.exports = {
  login,
  createUser,
  getUsers,
  userUpdate
};
