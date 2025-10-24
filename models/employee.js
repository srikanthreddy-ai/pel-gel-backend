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
      required: false,
    },
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    designation: {
      type: String,
      required: false,
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
      type: String
    },
    joiningDate: {
      type: String,
    },
    lastDate: {
      type: String,
    },
    dateOfProbation: {
      type: String,
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

EmployeeSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.title || update.firstName || update.lastName) {
    const title = update.title || this._update.$set.title;
    const firstName = update.firstName || this._update.$set.firstName;
    const lastName = update.lastName || this._update.$set.lastName;
    this.setUpdate({ ...update, fullName: `${title} ${firstName} ${lastName}` });
  }
  next();
});

const Staff = mongoose.model("Employee", EmployeeSchema);

module.exports = Staff;
