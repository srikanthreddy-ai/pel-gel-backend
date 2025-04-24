const mongoose = require("mongoose");

const ProductionShifts = new mongoose.Schema({
  shiftName: {
    type: String,
    required: true,
    unique: true,
  },
  shiftHrs: {
    type: Number,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean, default: false, index: true
  },
});

const Shifts = mongoose.model("Shifts", ProductionShifts);

module.exports = Shifts;
