const mongoose = require("mongoose");

const employeeAllowences = new mongoose.Schema({
  employee_id: {
    type: String,
    required: true,
    ref: "Employee",
  },
    productionDate: {
        type: Date,
        required: true,
    },
   Shifts: [{
    type: String,
    required: true,
    ref: "Shifts",
   }],
  amount: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean, default: false
  },
});

const empAllowences= mongoose.model("empAllowences", employeeAllowences);

module.exports = empAllowences;
