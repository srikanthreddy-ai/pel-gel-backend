const mongoose = require("mongoose");

const BankDetailsSchema = new mongoose.Schema({  
  accountNumber: String,
  ifsc: String,
  bankName: String,
  branchName: String,
  accountHolderName: String,
}, { _id: false });

const EmployeeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    designation: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    cader: {
      type: String,
      required: true,
    },
    empCode: {
      type: String,
      required: true,
      unique: true,
    },
    pfNo: {
      type: String,
    },
    basic: {
      type: Number,
    },
    fda: {
      type: Number,
    },
    newVda: {
      type: Number,
    },
    splPay: {
      type: Number,
    },
    hra: {
      type: Number,
    },
    ca: {
      type: Number,
    },
    sa: {
      type: Number,
    },
    ea: {
      type: Number,
    },
    serAllow: {
      type: Number,
    },
    linkMaintQcStoresAllow: {
      type: Number,
    },
    seniorityAllow: {
      type: Number,
    },
    stdGrossTotal: {
      type: Number,
    },
    totalGrossWithCantAb: {
      type: Number,
    },
    uanNumber: {
      type: String,
    },
    soWo: {
      type: String,
    },
    dateOfBirth: {
      type: Date
    },
    joiningDate: {
      type: Date,
    },
    lastDate: {
      type: Date,
    },
    dateOfProbation: {
      type: Date,
    },
    isDeleted: {
      type: Boolean, default: false, index: true
    },
    bankDetails: BankDetailsSchema,
  },
  { timestamps: true }
);

// Optional: Combine first and last name into fullName before saving
EmployeeSchema.pre("save", function (next) {
  this.fullName = `${this.title} ${this.firstName} ${this.lastName}`;
  next();
});

const Staff = mongoose.model("Employee", EmployeeSchema);

module.exports = Staff;
