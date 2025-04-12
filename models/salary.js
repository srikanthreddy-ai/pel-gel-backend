const mongoose = require("mongoose");

const employeeSalary = new mongoose.Schema({
  employee_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  employeeName: {
    type: String,
    required: true,
  },
  employeeCode: {
    type: String,
    required: true,
  },
  employeeDesignation: {
    type: String,
    required: true,
  },
  employeeShift: {
    type: String,
    required: true,
  },
  amount: {
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
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Salary = mongoose.model("empSalary", employeeSalary);

module.exports = Salary;
