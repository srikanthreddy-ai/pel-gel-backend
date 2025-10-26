const mongoose = require("mongoose");
const { type } = require("os");

const incentiveSchema = new mongoose.Schema({
  min: Number,
  max: Number,
  amount: Number,
  each: Number,
  additionalValues: {
    type: Boolean,
    default: false
  }
}, { _id: false });

const ProductionNature = new mongoose.Schema({
  building_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductionDept',
    required: true,
  },
  productionNature: {
    type: String,
    required: true,
  },
  productionType: {
    type: String,
    required: true,
  },
  productionCode: {
    type: String,
    required: true,
    unique: true,
  },
  manpower: {
    type: Number,
    required: true,
  },
  norms: {
    type: Number,
    required: true,
  },
  incentives: [incentiveSchema],
  target: {
    type: Boolean,
    default: false
  },
  reference_nature: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductionNature',
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isDeleted: {
    type: Boolean, default: false, index: true
  },
});

const Nature = mongoose.model("ProductionNature", ProductionNature);

module.exports = Nature;
