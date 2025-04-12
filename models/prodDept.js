const mongoose = require("mongoose");

const ProductionDept = new mongoose.Schema({
  buidlingId: {
    type: Number,
    required: true,
  },
  budlingName: {
    type: String,
    required: true,
  },
  buidlingCode: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Dept = mongoose.model("ProductionDept", ProductionDept);

module.exports = Dept;
