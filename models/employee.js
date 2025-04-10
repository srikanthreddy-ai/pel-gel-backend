const mongoose = require("mongoose");

const Employee = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  employeeCader: {
    type: String,
    required: true,
  },
  employeeId: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
  },
  lastDate: {
    type: Date,
  },
});

const Staff = mongoose.model("Employee", Employee);

module.exports = Staff;
