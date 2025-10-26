const mongoose = require("mongoose");

const employeeTimeSheet = new mongoose.Schema({
  productionDate: {
    type: Date,
    required: true,
  },
  building_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductionDept",
    required: true,
  },
  nature_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductionNature",
    required: true,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  shift_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shifts",
    required: true,
  },
  shiftName: {
    type: String,
    required: true,
  },
   workedHrs: {
    type: Number,
    required: true,
  },
  shiftHrs: {
    type: Number,
    required: true,
  },
  employeeCode: {
    type: String,
    required: true,
  },
  incentiveAmount: {
    type: Number,
  },
  allowenceAmount: {
    type: Number,
  },
  norms: {
    type: Number,
    required: true,
  },
  targetNorms: {
    type: Number,
    required: true,
  },
  netProduction: {
    type: Number,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
    index: true,
  },
});

employeeTimeSheet.index({ productionDate:1, employee_id: 1, shiftName: 1 }, { unique: true });
module.exports = mongoose.model("timeSheet", employeeTimeSheet);
