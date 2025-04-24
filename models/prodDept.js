const mongoose = require("mongoose");

const ProductionDept = new mongoose.Schema({
  buildingId: {
    type: Number,
    required: true,
  },
  buildingName: {
    type: String,
    required: true,
  },
  buildingCode: {
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
  isDeleted: {
    type: Boolean, default: false, index: true
  },
});

const Dept = mongoose.model("ProductionDept", ProductionDept);

module.exports = Dept;
