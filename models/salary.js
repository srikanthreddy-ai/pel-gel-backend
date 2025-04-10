const mongoose = require("mongoose");

const employeeSalary = new mongoose.Schema({
  amount: {
    type: String,
    required: true,
  },
  incentives: {
    type: Number,
    required: true,
  },
  allowences: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Salary = mongoose.model("empSalary", employeeSalary);

module.exports = Salary;
