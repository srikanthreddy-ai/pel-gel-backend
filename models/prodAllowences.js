const mongoose = require("mongoose");

const ProductionAllowences = new mongoose.Schema({
  allowence: {
    type: String,
    required: true,
  },
  shift: {
    type: String,
    enum: ["Day", "Night"],
  },
  amount: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean, default: false
  },
});

const ProdAllowence = mongoose.model("ProdAllowences", ProductionAllowences);

module.exports = ProdAllowence;
