const mongoose = require("mongoose");

const employeeAllowences = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Employee",
  },
  empCode: {
    type: String,
    required: true,
  },
  allowance_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "ProdAllowences",
  },
  building_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProductionDept",
    required: true,
  },
  productionDate: {
    type: Date,
    required: true,
  },
  shifts: [
    {
      type: String,
      required: true,
      ref: "Shifts",
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const empAllowences = mongoose.model("empAllowences", employeeAllowences);

module.exports = empAllowences;
