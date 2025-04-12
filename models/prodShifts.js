const mongoose = require("mongoose");

const ProductionShifts = new mongoose.Schema({
  shiftName: {
    type: Number,
    required: true,
  },
  shiftHrs: {
    type: String,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
});

const Shifts = mongoose.model("Shifts", ProductionShifts);

module.exports = Shifts;
