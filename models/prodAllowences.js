const mongoose = require("mongoose");

const ProductionAllowences = new mongoose.Schema({
  allowence: {
    type: String,
    required: true,
  },
  shift: {
    type: String,
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
