const mongoose = require("mongoose");

const banking = new mongoose.Schema({
  buidlingId: {
    type: Number,
    required: true,
  },
  buildingName: {
    type: String,
    required: true,
  },
  buidlingCode: {
    type: String,
    required: true,
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
    type: Boolean,
    default: false,
  },
});

const bankMaster = mongoose.model("bankMaster", banking);

module.exports = bankMaster;
