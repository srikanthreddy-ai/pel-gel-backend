const mongoose = require("mongoose");

const employeeTimeSheet = new mongoose.Schema({
  building_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductionDept",
    required: true,
  },
  naturre_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductionNature",
    required: true,
  },
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  shiftName: {
    type: String,
    required: true,
  },
  shiftHrs: {
    type: String,
    required: true,
  },
  employeeCode: {
    type: String,
    required: true,
  },
  incentiveAmount: {
    type: Number,
    required: true,
  },
  allowenceAmount: {
    type: Number,
    required: true,
  },
  norms:{
    type:Number,
    required:true
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("timeSheet", employeeTimeSheet);
